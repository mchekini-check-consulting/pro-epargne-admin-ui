import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatExpansionModule} from "@angular/material/expansion";
import {MatCardModule} from "@angular/material/card";
import {ContractService} from "@/core/service/contract.service";
import {Contract} from "@/core/model/app-contract-plan";

@Component({
    selector: 'app-consult-contract.ts',
    standalone: true,
    imports: [CommonModule, MatExpansionModule, MatCardModule],
    templateUrl: './consult-contract.component.html',
    styleUrl:"./consult-contract.component.scss"

})
export class ConsultContractComponent implements OnInit{

    panelOpenState = true;

    contractsPlan:Contract;

    constructor(private contractService:ContractService) {
    }

    ngOnInit(): void {
        this.getContractPlan();
    }

    getContractPlan(): void {
        this.contractService.getContractPlans()
            .subscribe(
                (contracts: Contract) => {
                    this.contractsPlan = contracts;
                },
                (error) => {}
            );
    }

}


