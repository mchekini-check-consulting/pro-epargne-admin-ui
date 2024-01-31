import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, ReplaySubject, tap } from 'rxjs';
import { CollaboratorType, CreateCollaboratorType } from './collaborator.type';

@Injectable({
    providedIn: 'root',
})
export class CollaboratorService {
    private _httpClient = inject(HttpClient);
    public _collaborators: ReplaySubject<CollaboratorType[]> =
        new ReplaySubject<CollaboratorType[]>(1);

    readonly BASE_URL = 'api/v1/collaborator'

    get collaborators$(): Observable<CollaboratorType[]> {
        return this._collaborators.asObservable();
    }

    get(): Observable<CollaboratorType[]> {
        return this._httpClient
            .get<CollaboratorType[]>(this.BASE_URL)
            .pipe(
                tap((collaborators:CollaboratorType[]) => {
                    this._collaborators.next(collaborators);
                })
            );
    }

    add(collaborator: CreateCollaboratorType): Observable<CollaboratorType> {
        return this._httpClient
            .post<CollaboratorType>(this.BASE_URL, collaborator )
            .pipe<CollaboratorType> (
                tap(() => {
                    this.get().subscribe()
                })
            );
    }

    update(collaborator: CollaboratorType): Observable<CollaboratorType> {
        return this._httpClient
            .put<CollaboratorType>(this.BASE_URL + "/" + collaborator.id,collaborator)
            .pipe<CollaboratorType>(
                tap(() => {
                    this.get().subscribe()
                })
            );
    }
}
