import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { LoaderService } from './loader/loader.service';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import { catchError, map } from 'rxjs/operators';
import { Article } from '../models/article.model';
import { Response } from '../models/response.model';


/**
 * Api is a generic REST Api handler. Set your API url first.
 */
@Injectable()
export class ApiService extends BaseService {

    url: string = environment.ApiUrl;
    apiKey: string = environment.ApiKey;

    constructor(public http: HttpClient,
                private loaderService: LoaderService) {
        super();
    }

    private extractData(res: any) {
        const articles: Article[] = [];
        res.response.docs.forEach(element => {
            const article = new Article(
                element._id,
                element.headline.main,
                element.pub_date,
                element.byline.original,
                element.multimedia.find(m => m.subtype === 'thumbnail'),
                element.multimedia.find(m => m.subtype === 'xlarge'),
                element.abstract,
                element.lead_paragraph);
            articles.push(article);
        });
        return new Response(articles, res.response.meta.hits);
    }

    get(endpoint: string, params?: any, sort: string = 'newest', page: number = 0): Observable<Response> {
        this.loaderService.show();
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
        if (params) {
            params += ` AND document_type:("article")`;
        } else {
            params = `fq=document_type:("article")`;
        }

        params += `&api-key=${this.apiKey}&sort=${sort}&page=${page}`;

        return this.http.get(`${this.url + endpoint}?${params}`, httpOptions)
        .pipe(
            map(response => {
                this.loaderService.hide();
                return this.extractData(response);
            })
        );
    }

    post(endpoint: string, body: any, reqOpts?: any) {
        this.loaderService.show();
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })
        };

        return this.http.post(this.url + endpoint, body, httpOptions)
        .pipe(
            map(response => {
                this.loaderService.hide();
                return this.extractData(response);
            }),
            catchError(error => {
                this.loaderService.hide();
                return this.handleError(error);
            })
        );
    }

    put(endpoint: string, body: any, reqOpts?: any) {
        return this.http.put(this.url + '/' + endpoint, body, reqOpts);
    }

    delete(endpoint: string, reqOpts?: any) {
        return this.http.delete(this.url + '/' + endpoint, reqOpts);
    }

    patch(endpoint: string, body: any, reqOpts?: any) {
        return this.http.put(this.url + '/' + endpoint, body, reqOpts);
    }
}
