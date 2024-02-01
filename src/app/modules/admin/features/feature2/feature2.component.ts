import { Component, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
    selector       : 'feature2',
    templateUrl    : './feature2.component.html',
    encapsulation  : ViewEncapsulation.None,
    standalone     : true,
    imports        : [MatButtonModule],
})
export class Feature2Component
{
    constructor(private router: Router) {}


    consultContract():void{
        this.router.navigate(['/features/feature2/consultContractScreen']);
    }

    createContract():void{
        this.router.navigate(['/features/feature2/create'])
    }
    
}
