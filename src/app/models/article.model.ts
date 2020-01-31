export class Article {
    constructor(id: string, title: string, publishDate: Date, author: string, thumbnail: any,
        image: any, abstract: string, content: string) {
        this.author = author;
        this.image = image;
        this.thumbnail = thumbnail;
        this.publishDate = publishDate;
        this.title = title;
        this.abstract = abstract;
        this.id = id;
        this.content = content;
    }
    title: string;
    abstract: string;
    content: string;
    publishDate: Date;
    author: string;
    thumbnail: any;
    image: any;
    id: string;
}
