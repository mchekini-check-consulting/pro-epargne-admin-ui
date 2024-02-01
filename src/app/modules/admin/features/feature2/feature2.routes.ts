import { Routes } from '@angular/router';
import { Feature2Component } from 'app/modules/admin/features/feature2/feature2.component';
import { CreateContractComponent } from './create-contract/create-contract.component';

export default [
    {
        path     : '',
        component: Feature2Component,
    },
    {
        path:'create',
        component: CreateContractComponent
    }
] as Routes;
