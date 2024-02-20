import { ContributionType } from '@/core/model/contribution';
import { PaginatedResult } from '@/core/model/pagination';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, ReplaySubject, tap } from 'rxjs';

type GetParams = {
    page: number;
    size: number;
    planType: string;
    status: string;
};

@Injectable({
    providedIn: 'root',
})
export class ContributionService {
    private _httpClient = inject(HttpClient);
    public _contributions: ReplaySubject<PaginatedResult<ContributionType>> =
        new ReplaySubject<PaginatedResult<ContributionType>>(1);

    readonly BASE_URL = 'api/v1/contribution';

    get contributions$(): Observable<PaginatedResult<ContributionType>> {
        return this._contributions.asObservable();
    }

    get(params?: GetParams): Observable<PaginatedResult<ContributionType>> {
        return this._httpClient
            .get<PaginatedResult<ContributionType>>(this.BASE_URL, {
                params,
            })
            .pipe(
                tap((transactions: PaginatedResult<ContributionType>) => {
                    console.log({ transactions });
                    this._contributions.next(transactions);
                })
            );
    }

    update(
        contribution: ContributionType['contribution'],
        params?: GetParams
    ): Observable<ContributionType['contribution']> {
        return this._httpClient
            .patch<ContributionType['contribution']>(
                this.BASE_URL + '/' + contribution.id,
                {}
            )
            .pipe(
                tap(() => {
                    this.get(params).subscribe();
                })
            );
    }
}
