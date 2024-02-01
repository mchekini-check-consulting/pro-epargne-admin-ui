import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { countries } from 'app/core/countries/Countries';
import { Observable, map, startWith } from 'rxjs';

@Component({
  selector: 'app-craete-contract',
  standalone: true,
  imports: [
    CommonModule, MatFormFieldModule,MatInputModule,MatDatepickerModule,MatSelectModule,MatRadioModule, MatCheckboxModule,
    MatStepperModule, MatButtonModule,FormsModule, ReactiveFormsModule, MatDividerModule
    ],
  templateUrl: './create-contract.component.html',
})
export class CreateContractComponent {

  constructor(private formBuilder:FormBuilder){}

  selectedAbondementTypePEE:string = ''
  selectedAbondementTypePERCO:string = ''

  peeChecked:boolean = false
  percoChecked:boolean = false
  countries = countries

  companyForm = this.formBuilder.group({
    firstCtrl: ['', Validators.required],
    siren: ['', Validators.required],
		companyName: ['', Validators.required],
		legalForm: ['', Validators.required],
		siret: ['', Validators.required],
		businessActivity: ['', Validators.required],
		businessAddress: ['', Validators.required],
		workforce: ['', Validators.required],
		totalWage: ['', Validators.required]
  });

  companySignatoryForm = this.formBuilder.group({
    lastName: ['', Validators.required],
    firstName: ['', Validators.required],
		email: ['', Validators.required],
		dateOfBirth: ['', Validators.required],
		jobTitle: ['', Validators.required],
		socialSecurityNumber: ['', Validators.required],
		countryOfBirth: ['', Validators.required],
		countryOfResidence: ['', Validators.required],
		executive: ['', Validators.required]
  });

  peeContributionForm = this.formBuilder.group({
    rateSimpleContribution: ['', Validators.required],
    ceilingSimpleContribution: ['', Validators.required],
		rateSeniorityContribution: ['', Validators.required],
		ceilingSeniorityContributionLessYear: ['', Validators.required],
		ceilingSeniorityContributionBetween1And3: ['', Validators.required],
		ceilingSeniorityContributionBetween3And5: ['', Validators.required],
		ceilingSeniorityContributionGreater5: ['', Validators.required],
		ceilingIntervalContributionFirst: ['', Validators.required],
		rateIntervalContributionFirst: ['', Validators.required],
		intervalContributionFirst: ['', Validators.required],
		ceilingIntervalContributionSecond: ['', Validators.required],
		rateIntervalContributionSecond: ['', Validators.required],
		intervalContributionSecond: ['', Validators.required],
		ceilingIntervalContributionThird: ['', Validators.required],
		rateIntervalContributionThird: ['', Validators.required],
		intervalContributionThird: ['', Validators.required],
		peeInterestAccepted: ['', Validators.required],
		peeVoluntaryDepositAccepted: ['', Validators.required],
		peeProfitSharingAccepted: ['', Validators.required],

  })

  percoContributionForm = this.formBuilder.group({
    rateSimpleContribution: ['', Validators.required],
    ceilingSimpleContribution: ['', Validators.required],
		rateSeniorityContribution: ['', Validators.required],
		ceilingSeniorityContributionLessYear: ['', Validators.required],
		ceilingSeniorityContributionBetween1And3: ['', Validators.required],
		ceilingSeniorityContributionBetween3And5: ['', Validators.required],
		ceilingSeniorityContributionGreater5: ['', Validators.required],
		ceilingIntervalContributionFirst: ['', Validators.required],
		rateIntervalContributionFirst: ['', Validators.required],
		intervalContributionFirst: ['', Validators.required],
		ceilingIntervalContributionSecond: ['', Validators.required],
		rateIntervalContributionSecond: ['', Validators.required],
		intervalContributionSecond: ['', Validators.required],
		ceilingIntervalContributionThird: ['', Validators.required],
		rateIntervalContributionThird: ['', Validators.required],
		intervalContributionThird: ['', Validators.required],
		percoInterestAccepted: ['', Validators.required],
		percoVoluntaryDepositAccepted: ['', Validators.required],
		percoProfitSharingAccepted: ['', Validators.required],
		percoTimeSavingAccountAccepted: ['', Validators.required],

  })

  onAbondementPeeTypeChange(event):void{
    this.selectedAbondementTypePEE =  event.value
  }
  onAbondementPercoTypeChange(event):void{
    this.selectedAbondementTypePERCO =  event.value
  }


  // filtredCountries: Observable<string[]>;

  // countryOfBirth = new FormControl('');
  // ngOnInit() {
  //   this.filtredCountries = this.countryOfBirth.valueChanges.pipe(
  //     startWith(''),
  //     map(value => this._filter(value || '')),
  //   );
  // }

  // private _filter(value: string): string[] {
  //   const filterValue = value.toLowerCase();

  //   return this.options.filter(option => option.toLowerCase().includes(filterValue));
  // }




}
