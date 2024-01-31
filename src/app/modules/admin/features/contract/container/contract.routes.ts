import { Routes } from '@angular/router';
import {ContractComponent} from '@/modules/admin/features/contract/container/contract.component';
import {ConsultContractComponent} from "@/modules/admin/features/contract/components/consult-contract/consult-contract.component";

export default [
    {
        path     : '',
        component: ContractComponent,
    },
    {
        path     : 'consult-contract.ts',
        component: ConsultContractComponent,
    },
] as Routes;
