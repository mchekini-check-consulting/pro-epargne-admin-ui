import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectCountryModule } from '@angular-material-extensions/select-country';
import { ContractService } from 'app/core/_contract/contract.service';
import { MatDialog } from '@angular/material/dialog';
import { SuccessComponent } from 'app/layout/common/dialog/success/success.component';


@Component({
  selector: 'app-craete-contract',
  standalone: true,
  imports: [
    CommonModule, MatFormFieldModule,MatInputModule,MatDatepickerModule,MatSelectModule,MatRadioModule, MatCheckboxModule,
    MatStepperModule, MatButtonModule,FormsModule, ReactiveFormsModule, MatDividerModule, MatSelectCountryModule,
   
    ],
  templateUrl: './create-contract.component.html',
})
export class CreateContractComponent {

  constructor(private formBuilder:FormBuilder, private contractService:ContractService,public dialog:MatDialog){}

  selectedAbondementTypePEE:string = ''
  selectedAbondementTypePERCO:string = ''

  peeChecked:boolean = false
  percoChecked:boolean = false




  companyForm = this.formBuilder.group({
		companyName: ['', Validators.required],
		legalForm: ['', Validators.required],
		siret: ['', [Validators.required, Validators.maxLength(13), Validators.minLength(13)]],
		siren: ['', Validators.required],
		businessActivity: ['', Validators.required],
		businessAddress: ['', Validators.required],
		workforce: ['', Validators.required],
		totalWages: ['', Validators.required],
		closingMonth: ['', Validators.required],

  });

  companySignatoryForm = this.formBuilder.group({
    lastName: ['', Validators.required],
    firstName: ['', Validators.required],
		email: ['', Validators.required],
		phone: ['', Validators.required],
		dateOfBirth: ["", Validators.required],
		jobTitle: ['', Validators.required],
		socialSecurityNumber: ['', Validators.required],
		countryOfBirth: [{name: "",alpha2Code: "",alpha3Code: "",numericCode: "",callingCode: ""}, Validators.required],
		countryOfResidence: [{name: "",alpha2Code: "",alpha3Code: "",numericCode: "",callingCode: ""}],
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
        companySignatory: {...this.companySignatoryForm.value,
          countryOfBirth:this.companySignatoryForm.value.countryOfBirth?.alpha2Code,
          countryOfResidence:this.companySignatoryForm.value.countryOfResidence?.alpha2Code,
          //dateOfBirth: this.companySignatoryForm.value.dateOfBirth.toISOString()!.split('T')[0]
          dateOfBirth: this.formatDate(this.companySignatoryForm.value.dateOfBirth)
          
        },
        peeContribution: this.peeContributionForm.value,
        percoContribution: this.percoContributionForm.value
    }
    
    
    this.contractService.postContract(newContract).subscribe(
        data=>{
          console.log(data)
          this.dialog.open(SuccessComponent, {
            data: {
              title: 'Contrat créé avec succès',
              body:'Votre contrat a été créé avec succès et vos choix ont bien été enregistrés'
            },
          })
      },
      error=>{
        console.log(error)
        
      }
    )

  }

  formatDate(date) {
    var d = new Date(date)
    return d.toISOString()!.split('T')[0]

}

}
