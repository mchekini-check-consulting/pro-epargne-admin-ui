import { CollaboratorType } from '@/core/model/collaborator.type';
import { Injectable } from '@angular/core';
import { FuseMockApiService } from '@fuse/lib/mock-api';
import { assign, cloneDeep } from 'lodash-es';
import { collaborators } from './data';

@Injectable({ providedIn: 'root' })
export class CollaboratorMockApi {
    private _collaborators: CollaboratorType[] = collaborators;

    readonly BASE_URL = 'api/common/collaborator'

    /**
     * Constructor
     */
    constructor(private _fuseMockApiService: FuseMockApiService) {
        // Register Mock API handlers
        this.registerHandlers();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Register Mock API handlers
     */
    registerHandlers(): void {
        // -----------------------------------------------------------------------------------------------------
        // @ Collaborator - GET
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onGet(this.BASE_URL)
            .reply(() => [200, cloneDeep(this._collaborators)]);

        // -----------------------------------------------------------------------------------------------------
        // @ Collaborator - PATCH
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onPatch(this.BASE_URL)
            .reply(({ request }) => {
                const updateCollaborator = cloneDeep(request.body.collaborator);
                const id = request.body.id;

                this._collaborators = this._collaborators.map(
                    (collaborator) => {
                        if (collaborator.id === id) {
                            return assign({}, collaborator, updateCollaborator);
                        }
                        return collaborator;
                    }
                );

                // Return the response
                return [200, cloneDeep(this._collaborators)];
            });

        this._fuseMockApiService
            .onPost(this.BASE_URL)
            .reply(({ request }) => {
                // Get the collaborator mock-api
                const collaborator = cloneDeep(request.body.collaborator);

                const newCollaborator = assign({}, collaborator, {
                    id: collaborators[collaborators.length - 1].id + 1,
                });
                // Update the collaborator mock-api
                this._collaborators = [...this._collaborators, newCollaborator];

                // Return the response
                return [200, cloneDeep(this._collaborators)];
            });
    }
}
