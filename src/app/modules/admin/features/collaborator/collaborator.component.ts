import {CollaboratorService} from '@/core/service/collaborator.service';
import {CollaboratorType} from '@/core/model/collaborator.type';
import {AsyncPipe, JsonPipe} from '@angular/common';
import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatDialog} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {Subject, takeUntil} from 'rxjs';
import {CreateCollaboratorComponent} from './component/create-collaborator/create-collaborator.component';
import {UpdateCollaboratorComponent} from './component/update-collaborator/update-collaborator.component';
import {ContractService} from "@/core/service/contract.service";
import {Contract} from "@/core/model/app-contract-plan";
import {AlertsDialogs} from "@/core/utils/alerts-dialogs";

@Component({
    selector: 'collaborator',
    templateUrl: './collaborator.component.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [
        AsyncPipe,
        JsonPipe,
        MatTableModule,
        MatIconModule,
        MatButtonModule,
    ],
})
export class CollaboratorComponent implements OnInit, OnDestroy {
    dataSource: CollaboratorType[];
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    displayedColumns: string[] = [
        'lastName',
        'firstName',
        'gender',
        'birthDate',
        'entryDate',
        'email',
        'grossSalary',
        'actions',
    ];

    isContractCreated: boolean = false;

    constructor(
        public dialog: MatDialog,
        private collaboratorService: CollaboratorService,
        private contractService: ContractService,
        private snackBar: AlertsDialogs,
    ) {
    }

    ngOnInit(): void {
        this.collaboratorService.get().subscribe();
        this.collaboratorService.collaborators$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((data) => {
                this.dataSource = data;
            });

        this.checkIfContractIsCreated();
    }

    createCollaborator() {
        this.isContractCreated ?
            this.dialog.open(CreateCollaboratorComponent) : this.snackBar.openSnackBar("Il faut d'abord créer un contrat", "Close");
    }

    updateCollaborator(collaborator: CollaboratorType) {
        this.dialog.open(UpdateCollaboratorComponent, {
            data: collaborator,
        });
    }

    checkIfContractIsCreated(): void {
        this.contractService.getContractPlans().subscribe(
            (contract: Contract) => {
                this.isContractCreated = contract.contractId ? true : false;
            },
            (error) => {
                if (error.statusCode === 404) {
                    this.isContractCreated = false;
                }
            }
        )
    }

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }
}
