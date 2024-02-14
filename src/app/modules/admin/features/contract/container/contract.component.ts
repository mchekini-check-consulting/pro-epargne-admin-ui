import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {Router} from '@angular/router';
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";

@Component({
    selector: 'feature2',
    templateUrl: './contract.component.html',
    styleUrl: './contract.component.scss',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [MatButtonModule, MatCardModule, MatIconModule],
})
export class ContractComponent implements OnInit {
    constructor(private router: Router) {
    }

    ngOnInit() {

    }

    consultContract(): void {
        this.router.navigate(['/features/contract/consult-contract.ts']);
    }

    createContract(): void {
        this.router.navigate(['/features/contract/create-contract.ts']);
    }

}
