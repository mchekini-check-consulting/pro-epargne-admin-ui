import { Injectable } from '@angular/core';
import { FuseMockApiService } from '@fuse/lib/mock-api';
import { assign, cloneDeep } from 'lodash-es';

@Injectable({providedIn: 'root'})
export class contractMockApi
{
    private _contract: any = {};

    /**
     * Constructor
     */
    constructor(private _fuseMockApiService: FuseMockApiService)
    {
        // Register Mock API handlers
        this.registerHandlers();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Register Mock API handlers
     */
    registerHandlers(): void
    {
        // -----------------------------------------------------------------------------------------------------
        // @ contract - GET
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onGet('api/common/contract')
            .reply(() => [200, cloneDeep(this._contract)]);

        // -----------------------------------------------------------------------------------------------------
        // @ contract - PATCH
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onPatch('api/common/contract')
            .reply(({request}) =>
            {
                // Get the contract mock-api
                const contract = cloneDeep(request.body.contract);

                // Update the contract mock-api
                this._contract = assign({}, this._contract, contract);

                // Return the response
                return [200, cloneDeep(this._contract)];
            });

            this._fuseMockApiService
            .onPost('api/common/contract')
            .reply(({request}) =>
            {
                // Get the contract mock-api
                const contract = cloneDeep(request.body.contract);

                // Update the contract mock-api
                this._contract = assign({}, this._contract, contract);

                // Return the response
                return [200, cloneDeep(this._contract)];
            });
    }
}
