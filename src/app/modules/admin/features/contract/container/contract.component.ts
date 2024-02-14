import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {Router} from '@angular/router';
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {AlertsDialogs} from "@/core/utils/alerts-dialogs";
import {ContractService} from "@/core/service/contract.service";
import {Contract} from "@/core/model/app-contract-plan";
import {DateUtils} from "@/core/utils/date-formater";

@Component({
    selector: 'feature2',
    templateUrl: './contract.component.html',
    styleUrl: './contract.component.scss',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [MatButtonModule, MatCardModule, MatIconModule],
})
export class ContractComponent implements OnInit {
    constructor(private router: Router, private snackBar: AlertsDialogs, private dateUtils: DateUtils, private contractService: ContractService) {
    }

    isContractCreated: boolean = true;
    isContractActive: boolean = true;
    createdAtDate: Date;
    contractCreatedDateEnd: Date;


    ngOnInit() {
        this.checkIfContractCreatedAndActive();

    }

    checkIfContractCreatedAndActive(): void {
        this.contractService.getContractPlans()
            .subscribe(
                (contract: Contract) => {

                    this.createdAtDate = new Date(contract.createdAt);
                    this.contractCreatedDateEnd = new Date(this.createdAtDate.getFullYear() + 1, this.createdAtDate.getMonth(), this.createdAtDate.getDate());
                    this.isContractCreated = contract.contractId ? true : false;

                    if (this.createdAtDate < this.contractCreatedDateEnd) {
                        this.isContractActive = true;
                    } else {
                        this.isContractActive = false;
                    }
                }

                ,
                (
                    error
                ) => {

                    this
                        .isContractActive = false;
                    this
                        .isContractCreated = false;

                }
            )
        ;
    }

    consultContract()
        :
        void {
        this.router.navigate(['/features/contract/consult-contract.ts']);
    }

    createContract()
        :
        void {
        this.isContractActive ?
            this.snackBar.openSnackBar("vous ne pouvez pas modifer votre contract avant le " + this.dateUtils.formatDateYMD(this.contractCreatedDateEnd)) :
            this.router.navigate(['/features/contract/create-contract.ts']);
    }

}
