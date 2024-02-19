import { ContributionType } from '@/core/model/contribution';
import { ContributionService } from '@/core/service/contribution.service';
import { ErrorComponent } from '@/layout/common/dialogs/responses/error/error_dialog';
import { SuccessComponent } from '@/layout/common/dialogs/responses/success/success_dialog';
import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { Subject, catchError, takeUntil } from 'rxjs';

type ParamsType = { page: number; size: number; planType: string };

@Component({
    selector: 'app-contribution',
    standalone: true,
    imports: [
        CommonModule,
        MatTableModule,
        MatPaginatorModule,
        MatSelectModule,
        ReactiveFormsModule,
        MatSortModule,
        MatButtonModule,
        MatIconModule,
    ],
    templateUrl: './contribution.component.html',
    styleUrl: './contribution.component.scss',
})
export class ContributionComponent implements OnInit, OnDestroy {
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    dataSource: ContributionType[];

    displayedColumns: string[] = [
        'createdAt',
        'amount',
        'planType',
        'status',
        'Action',
    ];

    statusOption = {
        APPROVED: 'Traité',
        PENDING: 'Non traité',
    };

    typeControl = new FormControl('');
    operationTypes = [
        { value: '', name: 'Tous les types' },
        { value: 'PEE', name: 'Pee' },
        { value: 'PERECO', name: 'Pereco' },
    ];

    totalElements = 0;
    params: ParamsType = {
        page: 0,
        size: 10,
        planType: '',
    };

    constructor(
        private contributionService: ContributionService,
        private dialog: MatDialog
    ) {}

    onParamsUpdate(paramUpdate: Partial<ParamsType>) {
        this.params = {
            page: paramUpdate?.page ?? this.params.page,
            size: paramUpdate?.size ?? this.params.size,
            planType: paramUpdate?.planType ?? this.params.planType,
        };
    }

    ngOnInit(): void {
        this.contributionService.get(this.params).subscribe();
        this.contributionService.contributions$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((data) => {
                this.dataSource = data.content;
                this.totalElements = data.totalElements;
            });
    }

    onPageChange(event: any): void {
        this.onParamsUpdate({ page: event.pageIndex, size: event.pageSize });
        this.contributionService.get(this.params).subscribe();
    }

    onFilter(planType: string): void {
        this.onParamsUpdate({ page: 0, size: 10, planType });
        this.contributionService.get(this.params).subscribe();
    }

    updateContribution(contribution: ContributionType) {
        this.contributionService
            .update(contribution.contribution, this.params)
            .pipe(
                catchError(() => {
                    this.dialog.open(ErrorComponent, {
                        data: {
                            title: 'Erreur serveur',
                            body: "Le serveur a rencontré des erreurs lors du traitement de l'abondement.",
                        },
                    });
                    return [];
                })
            )
            .subscribe(() => {
                this.dialog.open(SuccessComponent, {
                    data: {
                        title: 'Abondement traité avec succès.',
                        body: 'Votre abondement a été traité avec succès.',
                    },
                });
            });
    }

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.complete();
        this._unsubscribeAll.next(null);
    }
}
