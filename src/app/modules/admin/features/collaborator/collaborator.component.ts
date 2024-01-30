import {
    ChangeDetectorRef,
    Component,
    OnInit,
    ViewEncapsulation,
} from '@angular/core';
import { AppInformationService } from '../../../../core/app-information/app-information.service';
import { Observable } from 'rxjs';
import { AppInformation } from '../../../../core/app-information/app-information';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

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
export class CollaboratorComponent implements OnInit {
    app: Observable<AppInformation>;

    dataSource: any[];
    displayedColumns: string[];

    ELEMENT_DATA = [
        {
            lastName: 'test',
            firstName: 'test',
            gender: 'test',
            birthDate: 'test',
            entryDate: 'test',
            email: 'test',
            grossSalary: 'test',
        },
        {
            lastName: 'test',
            firstName: 'test',
            gender: 'test',
            birthDate: 'test',
            entryDate: 'test',
            email: 'test',
            grossSalary: 'test',
        },
        {
            lastName: 'test',
            firstName: 'test',
            gender: 'test',
            birthDate: 'test',
            entryDate: 'test',
            email: 'test',
            grossSalary: 'test',
        },
    ];

    constructor(private cdr: ChangeDetectorRef) {}

    ngOnInit(): void {
        this.displayedColumns = [
            'lastName',
            'firstName',
            'gender',
            'birthDate',
            'entryDate',
            'email',
            'grossSalary',
            'actions',
        ];
        this.dataSource = this.ELEMENT_DATA;
    }

    createCollaborator() {
        // this.ELEMENT_DATA.push({
        //     lastName: '',
        //     firstName: '',
        //     gender: '',
        //     birthDate: '',
        //     entryDate: '',
        //     email: '',
        //     grossSalary: 'aa',
        // });
        this.dataSource.push({
            lastName: '',
            firstName: '',
            gender: '',
            birthDate: '',
            entryDate: '',
            email: 'aa',
            grossSalary: '',
        });

        this.cdr.detectChanges();
        console.log('new data source', this.dataSource);
    }

    updateCollaborator() {
        console.log('update collab');
    }
}
