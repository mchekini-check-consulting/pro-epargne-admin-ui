import { Injectable } from '@angular/core';
import {DatePipe, registerLocaleData} from "@angular/common";
import localeFr from '@angular/common/locales/fr';


@Injectable({
    providedIn: 'root',
})
export class DateUtils {
    constructor() {
        registerLocaleData(localeFr, 'fr');
    }

    public formatDateYMD(date: Date): string {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new DatePipe("fr").transform(date, 'dd-MM-yyyy', 'UTC');
}

}



