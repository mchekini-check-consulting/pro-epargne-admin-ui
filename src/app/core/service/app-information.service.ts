import {HttpClient} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AppInformation} from "../model/app-information";

@Injectable({providedIn: 'root'})
export class AppInformationService {
    private _httpClient = inject(HttpClient);

    /**
     * Get application information
     */
    getAppInformation(): Observable<AppInformation> {
        return this._httpClient.get<AppInformation>('api/v1/app');
    }
}
