import { CollaboratorType } from '@/core/model/collaborator.type';
import { CollaboratorService } from '@/core/service/collaborator.service';
import { CommonModule, formatDate } from '@angular/common';
import { Component, Inject } from '@angular/core';

import {
    FormControl,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
    MAT_DIALOG_DATA,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { catchError, take } from 'rxjs';

@Component({
    selector: 'app-update-collaborator',
    standalone: true,
    imports: [
        CommonModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        MatButtonModule,
        MatDialogTitle,
        MatDialogContent,
        MatDialogActions,
        MatDialogClose,
        ReactiveFormsModule,
        MatDatepickerModule,
        MatRadioModule,
        MatIconModule,
    ],
    templateUrl: './update-collaborator.component.html',
    styleUrl: './update-collaborator.component.scss',
})
export class UpdateCollaboratorComponent {
    successMessage: string = '';
    errorMessage: string = '';

    collaborator: CollaboratorType;
    formData = new FormGroup({
        lastName: new FormControl('', [Validators.required]),
        firstName: new FormControl('', [Validators.required]),
        gender: new FormControl('', [Validators.required]),
        birthDate: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        entryDate: new FormControl('', [Validators.required]),
        grossSalary: new FormControl('', [Validators.required]),
    });

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: CollaboratorType,
        private collaboratorService: CollaboratorService
    ) {
        this.collaborator = data;
        this.formData.setValue({
            lastName: data.lastName,
            firstName: data.firstName,
            gender: data.gender,
            birthDate: data.birthDate,
            email: data.email,
            entryDate: data.entryDate,
            grossSalary: String(data.grossSalary),
        });
    }

    get lastName() {
        return this.formData.get('lastName');
    }

    get firstName() {
        return this.formData.get('firstName');
    }

    get gender() {
        return this.formData.get('gender');
    }

    get birthDate() {
        return this.formData.get('birthDate');
    }

    get entryDate() {
        return this.formData.get('entryDate');
    }

    get email() {
        return this.formData.get('email');
    }

    get grossSalary() {
        return this.formData.get('grossSalary');
    }

    submitData() {
        const format = 'yyyy-MM-dd';
        const locale = 'en-US';

        const formatData = {
            lastName: this.lastName.value,
            firstName: this.firstName.value,
            gender: this.gender.value,
            birthDate: this.birthDate.value
                ? formatDate(this.birthDate.value, format, locale)
                : '',
            entryDate: this.birthDate.value
                ? formatDate(this.birthDate.value, format, locale)
                : '',
            email: this.email.value,
            grossSalary: +this.grossSalary.value,
            id: this.collaborator.id,
        };

        if (!this.formData.invalid) {
            this.collaboratorService
                .update(formatData)
                .pipe(
                    take(1),
                    catchError(() => {
                        this.errorMessage = 'Une erreur est survenue.';
                        return '';
                    })
                )
                .subscribe((value) => {
                    if (value) {
                        this.successMessage =
                            'Collaborateur mis à jour avec succès.';
                    }
                });
        }
    }
}
