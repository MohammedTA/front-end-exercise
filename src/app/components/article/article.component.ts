import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/services/article.service';
import { Article } from 'src/app/models/article.model';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';

declare const $: any;

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  article: Article;
  url: string = environment.Url;

  constructor(public articleService: ArticleService,
              private route: ActivatedRoute,
  ) {
    this.route.params.subscribe(params => {
      articleService.get(params.id).subscribe(data => {
        this.article = data.articles[0];
      });
    });
  }

  ngOnInit() {
  }

}
