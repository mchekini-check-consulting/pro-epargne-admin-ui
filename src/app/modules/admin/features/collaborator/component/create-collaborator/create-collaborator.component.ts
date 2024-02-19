import { CollaboratorService } from '@/core/service/collaborator.service';
import { CommonModule, formatDate } from '@angular/common';
import { Component } from '@angular/core';

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
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { MatRadioModule } from '@angular/material/radio';
import { catchError, take } from 'rxjs';

@Component({
    selector: 'app-create-collaborator',
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
    templateUrl: './create-collaborator.component.html',
    styleUrl: './create-collaborator.component.scss',
})
export class CreateCollaboratorComponent {
    successMessage: string = '';
    errorMessage: string = '';

    formData = new FormGroup({
        lastName: new FormControl('', [Validators.required]),
        firstName: new FormControl('', [Validators.required]),
        gender: new FormControl('', [Validators.required]),
        birthDate: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        entryDate: new FormControl('', [Validators.required]),
        grossSalary: new FormControl('', [Validators.required]),
    });

    constructor(private collaboratorService: CollaboratorService) {}

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
        };

        if (!this.formData.invalid) {
            this.collaboratorService
                .add(formatData)
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
                            'Collaborateur ajouté avec succès.';
                    }
                });
        }
    }
}
