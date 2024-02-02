import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { EmailValidator, FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectCountryModule } from '@angular-material-extensions/select-country';
import { ContractService } from 'app/core/_contract/contract.service';


@Component({
  selector: 'app-craete-contract',
  standalone: true,
  imports: [
    CommonModule, MatFormFieldModule,MatInputModule,MatDatepickerModule,MatSelectModule,MatRadioModule, MatCheckboxModule,
    MatStepperModule, MatButtonModule,FormsModule, ReactiveFormsModule, MatDividerModule, MatSelectCountryModule
    ],
  templateUrl: './create-contract.component.html',
})
export class CreateContractComponent {

  constructor(private formBuilder:FormBuilder, private contractService:ContractService){}

  selectedAbondementTypePEE:string = ''
  selectedAbondementTypePERCO:string = ''

  peeChecked:boolean = false
  percoChecked:boolean = false




  companyForm = this.formBuilder.group({
    siren: ['', Validators.required],
		companyName: ['', Validators.required],
		legalForm: ['', Validators.required],
		siret: ['', Validators.required, Validators.maxLength(13),Validators.minLength(13)],
		businessActivity: ['', Validators.required],
		businessAddress: ['', Validators.required],
		workforce: ['', Validators.required],
		totalWage: ['', Validators.required],
		closingMonth: ['', Validators.required],

  });

  companySignatoryForm = this.formBuilder.group({
    lastName: ['', Validators.required],
    firstName: ['', Validators.required],
		email: ['', Validators.required,EmailValidator],
		phone: ['', Validators.required],
		dateOfBirth: ['', Validators.required],
		jobTitle: ['', Validators.required],
		socialSecurityNumber: ['', Validators.required],
		countryOfBirth: ['', Validators.required,Validators],
		countryOfResidence: [''],
		executive: [false, Validators.required],
		eligibility: ['', Validators.required],
  });

  peeContributionForm = this.formBuilder.group({
    rateSimpleContribution: ['', Validators.required],
    ceilingSimpleContribution: ['', Validators.required],
		rateSeniorityContribution: ['', Validators.required],//

		ceilingSeniorityContributionLessYear: ['', Validators.required],//
		ceilingSeniorityContributionBetween1And3: ['', Validators.required],//
		ceilingSeniorityContributionBetween3And5: ['', Validators.required],//
		ceilingSeniorityContributionGreater5: ['', Validators.required],//

		ceilingIntervalContributionFirst: ['', Validators.required],
		rateIntervalContributionFirst: ['', Validators.required],

		//intervalContributionFirstFrom: ['', Validators.required],
		intervalContributionFirst: ['', Validators.required],

		ceilingIntervalContributionSecond: ['', Validators.required],
		rateIntervalContributionSecond: ['', Validators.required],

		//intervalContributionSecondFrom: ['', Validators.required],
		intervalContributionSecond: ['', Validators.required],

		ceilingIntervalContributionThird: ['', Validators.required],
		rateIntervalContributionThird: ['', Validators.required],

		//intervalContributionThirdFrom: ['', Validators.required],
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

		//intervalContributionFirstFrom: ['', Validators.required],
		intervalContributionFirst: ['', Validators.required],

		ceilingIntervalContributionSecond: ['', Validators.required],
		rateIntervalContributionSecond: ['', Validators.required],

		//intervalContributionSecondFrom: ['', Validators.required],
		intervalContributionSecond: ['', Validators.required],

		ceilingIntervalContributionThird: ['', Validators.required],
		rateIntervalContributionThird: ['', Validators.required],

		//intervalContributionThirdFrom: ['', Validators.required],
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

  onPeeCheckedChange(event):void{
    this.peeChecked =event.checked
  }
  onPercoCheckedChange(event):void{
    this.percoChecked =event.checked
  }

  noPlanSelected(){
    return !(this.peeChecked || this.percoChecked)
  }



  onSubmit(){
    const newContract = {
        closingMonth: this.companyForm.value['closingMonth'], 
        eligibility: this.companySignatoryForm.value['eligibility'],
        company: this.companyForm.value,
        companySignatory: this.companySignatoryForm.value,
        peeContribution: this.peeContributionForm.value,
        perecoContribution: this.percoContributionForm.value
    }
    console.log('submiiiiiiiiiiteeeed')
    console.warn(" company form ",this.companyForm.value)
    console.warn(" company admin personne ",this.companySignatoryForm.value)
    console.warn(" pee form ",this.percoContributionForm.value)
    console.warn(" perco form ",this.percoContributionForm.value)

    this.contractService.postContract(newContract).subscribe(data=>console.log(data))

  }

}
