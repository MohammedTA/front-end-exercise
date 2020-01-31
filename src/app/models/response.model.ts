import { Article } from './article.model';

export class Response {
    constructor(articles: Article[], resultCount: number) {
        this.articles = articles;
        this.resultCount = resultCount;
    }
    articles: Article[];
    resultCount: number;
}
