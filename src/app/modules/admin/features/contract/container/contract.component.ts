import { Component, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
    selector       : 'feature2',
    templateUrl    : './contract.component.html',
    encapsulation  : ViewEncapsulation.None,
    standalone     : true,
    imports        : [MatButtonModule],
})
export class ContractComponent
{
    constructor(private router: Router) {}


    consultContract():void{
        this.router.navigate(['/features/contract/consult-contract.ts']);
    }

    createContract():void{
        this.router.navigate(['/features/contract/create-contract.ts']);
    }

}
