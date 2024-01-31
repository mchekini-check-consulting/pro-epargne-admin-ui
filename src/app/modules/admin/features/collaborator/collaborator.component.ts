import { CollaboratorService } from '@/core/collaborator/collaborator.service';
import { CollaboratorType } from '@/core/collaborator/collaborator.type';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Subject, takeUntil } from 'rxjs';
import { CreateCollaboratorComponent } from './component/create-collaborator/create-collaborator.component';
import { UpdateCollaboratorComponent } from './component/update-collaborator/update-collaborator.component';

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

    constructor(
        public dialog: MatDialog,
        private collaboratorService: CollaboratorService
    ) {}

    ngOnInit(): void {
        this.collaboratorService.get().subscribe();
        this.collaboratorService.collaborators$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((data) => {
                this.dataSource = data;
            });
    }

    createCollaborator() {
        this.dialog.open(CreateCollaboratorComponent);
    }

    updateCollaborator(collaborator: CollaboratorType) {
        this.dialog.open(UpdateCollaboratorComponent, {
            data: collaborator,
        });
    }

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }
}
