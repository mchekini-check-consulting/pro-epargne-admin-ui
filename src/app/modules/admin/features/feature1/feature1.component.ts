import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AppInformationService} from "../../../../core/app-information/app-information.service";
import {Observable} from "rxjs";
import {AppInformation} from "../../../../core/app-information/app-information";
import {AsyncPipe, JsonPipe} from "@angular/common";

@Component({
    selector: 'feature1',
    templateUrl: './feature1.component.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [
        AsyncPipe,
        JsonPipe
    ],
})
export class Feature1Component implements OnInit {

    app: Observable<AppInformation>;

    constructor(private readonly appInformation: AppInformationService) {
    }

    ngOnInit(): void {
        this.app = this.appInformation.getAppInformation();
    }
}
