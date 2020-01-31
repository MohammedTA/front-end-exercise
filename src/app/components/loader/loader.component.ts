import { OnInit, Component } from '@angular/core';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { LoaderState } from 'src/app/services/loader/loader.state';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-loader',
    templateUrl: './loader.component.html',
    styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
    loaded = false;
    private subscription: Subscription;
    constructor(private loaderService: LoaderService) { }
    ngOnInit() {
        this.subscription = this.loaderService.loaderState
            .subscribe((state: LoaderState) => {
                this.loaded = state.loaded;
            });
    }
    OnDestroy() {
        this.subscription.unsubscribe();
    }
}
