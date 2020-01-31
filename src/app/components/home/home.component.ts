import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ArticleService } from 'src/app/services/article.service';
import { environment } from 'src/environments/environment';
import { fromEvent } from 'rxjs';
import { map, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Response } from 'src/app/models/response.model';

declare const $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  results: Response;
  url: string = environment.Url;
  @ViewChild('searchInput') searchInput: ElementRef;
  isSearching = false;
  config: any;
  p = 0;
  order = 'newest';

  constructor(public articleService: ArticleService
  ) {
    this.getAllArticles();
  }

  getAllArticles() {
    this.articleService.getAll('', this.order, 0).subscribe(data => {
      this.results = data;
    });
  }

  orderArticles(order) {
    this.order = order;
    this.getAllArticles();
  }

  pageChanged(event) {
    this.p = event;
    this.articleService.getAll('', this.order, this.p).subscribe(data => {
      this.results = data;
    });
  }

  getArticleId(id: string) {
    return id.split('/')[3];
  }

  ngOnInit() {
    fromEvent(this.searchInput.nativeElement, 'keyup').pipe(
      map((event: any) => {
        return event.target.value;
      }),
      debounceTime(1000),
      distinctUntilChanged()
    ).subscribe((text: string) => {
      this.isSearching = true;
      this.p = 0;
      this.articleService.filter(text).subscribe(data => {
        console.log(data);
        this.results = data;
        this.isSearching = false;
      });
    });
  }

}
