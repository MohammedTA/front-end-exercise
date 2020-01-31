import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Article } from '../models/article.model';
import { Response } from '../models/response.model';

@Injectable()
export class ArticleService {

  constructor(public api: ApiService) {
  }

  public getAll(query: string, sort: string, page: number): Observable<Response> {
    return this.api.get(`articlesearch.json`, query, sort, page);
  }

  public get(id): Observable<Response> {
    return this.api.get('articlesearch.json', `fq=_id:("nyt://article/${id}")`);
  }

  public filter(query: string): Observable<Response> {
    return this.api.get('articlesearch.json', query != null && query !== '' ? `fq=headline:("${query}")` : '');
  }
}
