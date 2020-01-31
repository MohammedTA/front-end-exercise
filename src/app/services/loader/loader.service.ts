import { Injectable } from '@angular/core';
import { LoaderState } from './loader.state';
import { Subject } from 'rxjs';
@Injectable()
export class LoaderService {
    private loaderSubject = new Subject<LoaderState>();
    loaderState = this.loaderSubject.asObservable();
    constructor() { }
    show() {
        this.loaderSubject.next({ loaded: true } as LoaderState);
    }
    hide() {
        this.loaderSubject.next({ loaded: false } as LoaderState);
    }
}
