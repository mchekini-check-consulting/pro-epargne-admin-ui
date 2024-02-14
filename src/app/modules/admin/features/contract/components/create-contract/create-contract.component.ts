import {Component, OnInit} from '@angular/core';
import {CommonModule, formatDate} from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatSelectCountryModule} from '@angular-material-extensions/select-country';
import {ContractService} from "app/core/service/contract.service";
import {MatDialog} from '@angular/material/dialog';
import {SuccessComponent} from '@/layout/common/dialogs/responses/success/success_dialog';
import {ErrorComponent} from '@/layout/common/dialogs/responses/error/error_dialog';
import {Contract} from "@/core/model/app-contract-plan";


@Component({
    selector: 'app-craete-contract',
    standalone: true,
    imports: [
        CommonModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatSelectModule, MatRadioModule, MatCheckboxModule,
        MatStepperModule, MatButtonModule, FormsModule, ReactiveFormsModule, MatDividerModule, MatSelectCountryModule,

    ],
    templateUrl: './create-contract.component.html',
})
export class CreateContractComponent implements OnInit {


    constructor(
        private formBuilder: FormBuilder,
        private contractService: ContractService,
        public dialog: MatDialog) {

    }

    contract: Contract = null;


    ngOnInit() {
        this.getContract();
    }

    getContract() {
        this.contractService.getContractPlans().subscribe(
            (contract: Contract) => {
                this.contract = contract;
                console.log(this.contract);
                this.initDefaultValuesIfExist();
            },
            (error) => {
                this.contract = null;
            }
        );
    }

    initDefaultValuesIfExist(): void {
        this.initCompanyFormIfExist();
        this.initCompanySignatoryFormIfExist();
        this.initPeeContributionFormIfExist();
        this.initPerecoContributionFormIfExist();
        this.initDefaultValuesForCheckedPeePereco();
    }

    initCompanyFormIfExist(): void {
        this.companyForm.patchValue({
            companyName: this.contract.company.companyName,
            legalForm: this.contract.company.legalForm,
            siret: this.contract.company.siret,
            siren: this.contract.company.siren,
            businessActivity: this.contract.company.businessActivity,
            businessAddress: this.contract.company.businessAddress,
            workforce: this.contract.company.workforce?.toString(),
            totalWages: this.contract.company.totalWages?.toString(),
            closingMonth: this.contract.closingMonth

        });
    }

    initCompanySignatoryFormIfExist(): void {
        this.companySignatoryForm.patchValue({
            lastName: this.contract.companySignatory.lastName,
            firstName: this.contract.companySignatory.firstName,
            email: this.contract.companySignatory.email,
            phone: this.contract.companySignatory.phone?.toString(),
            dateOfBirth: this.contract.companySignatory.dateOfBirth,
            jobTitle: this.contract.companySignatory.jobTitle,
            socialSecurityNumber: this.contract.companySignatory.socialSecurityNumber,
            countryOfBirth: {
                name: this.contract.companySignatory.countryOfBirth,
                alpha2Code: this.contract.companySignatory.countryOfBirth,
                alpha3Code: this.contract.companySignatory.countryOfBirth,
                numericCode: this.contract.companySignatory.countryOfBirth,
                callingCode: this.contract.companySignatory.countryOfBirth
            },
            countryOfResidence: {
                name: this.contract.companySignatory.countryOfResidence,
                alpha2Code: this.contract.companySignatory.countryOfResidence,
                alpha3Code: this.contract.companySignatory.countryOfResidence,
                numericCode: this.contract.companySignatory.countryOfResidence,
                callingCode: this.contract.companySignatory.countryOfResidence
            },
            executive: this.contract.companySignatory.executive?.toString(),
            eligibility: this.contractService.transformEligibilityStringToInt(this.contract.eligibility)
        });
    }

    initPeeContributionFormIfExist(): void {
        this.peeContributionForm.patchValue({
            rateSimpleContribution: this.contract.peeContribution.rateSimpleContribution?.toString(),
            ceilingSimpleContribution: this.contract.peeContribution.ceilingSimpleContribution?.toString(),
            rateSeniorityContribution: this.contract.peeContribution.rateSeniorityContribution?.toString(),
            ceilingSeniorityContributionLessYear: this.contract.peeContribution.ceilingSeniorityContributionLessYear?.toString(),
            ceilingSeniorityContributionBetween1And3: this.contract.peeContribution.ceilingSeniorityContributionBetween1And3?.toString(),
            ceilingSeniorityContributionBetween3And5: this.contract.peeContribution.ceilingSeniorityContributionBetween3And5?.toString(),
            ceilingSeniorityContributionGreater5: this.contract.peeContribution.ceilingSeniorityContributionGreater5?.toString(),
            ceilingIntervalContributionFirst: this.contract.peeContribution.ceilingIntervalContributionFirst?.toString(),
            rateIntervalContributionFirst: this.contract.peeContribution.rateIntervalContributionFirst?.toString(),
            intervalContributionFirst: this.contract.peeContribution.intervalContributionFirst?.toString(),
            ceilingIntervalContributionSecond: this.contract.peeContribution.ceilingIntervalContributionSecond?.toString(),
            rateIntervalContributionSecond: this.contract.peeContribution.rateIntervalContributionSecond?.toString(),
            intervalContributionSecond: this.contract.peeContribution.intervalContributionSecond?.toString(),
            ceilingIntervalContributionThird: this.contract.peeContribution.ceilingIntervalContributionThird?.toString(),
            rateIntervalContributionThird: this.contract.peeContribution.rateIntervalContributionThird?.toString(),
            intervalContributionThird: this.contract.peeContribution.intervalContributionThird?.toString(),
            peeInterestAccepted: this.contract.peeContribution.peeInterestAccepted?.toString(),
            peeVoluntaryDepositAccepted: this.contract.peeContribution.peeVoluntaryDepositAccepted?.toString(),
            peeProfitSharingAccepted: this.contract.peeContribution.peeProfitSharingAccepted?.toString(),
        });
    }

    initPerecoContributionFormIfExist(): void {
        this.perecoContributionForm.patchValue({
            rateSimpleContribution: this.contract.perecoContribution.rateSimpleContribution?.toString(),
            ceilingSimpleContribution: this.contract.perecoContribution.ceilingSimpleContribution?.toString(),
            rateSeniorityContribution: this.contract.perecoContribution.rateSeniorityContribution?.toString(),
            ceilingSeniorityContributionLessYear: this.contract.perecoContribution.ceilingSeniorityContributionLessYear?.toString(),
            ceilingSeniorityContributionBetween1And3: this.contract.perecoContribution.ceilingSeniorityContributionBetween1And3?.toString(),
            ceilingSeniorityContributionBetween3And5: this.contract.perecoContribution.ceilingSeniorityContributionBetween3And5?.toString(),
            ceilingSeniorityContributionGreater5: this.contract.perecoContribution.ceilingSeniorityContributionGreater5?.toString(),
            ceilingIntervalContributionFirst: this.contract.perecoContribution.ceilingIntervalContributionFirst?.toString(),
            rateIntervalContributionFirst: this.contract.perecoContribution.rateIntervalContributionFirst?.toString(),
            intervalContributionFirst: this.contract.perecoContribution.intervalContributionFirst?.toString(),
            ceilingIntervalContributionSecond: this.contract.perecoContribution.ceilingIntervalContributionSecond?.toString(),
            rateIntervalContributionSecond: this.contract.perecoContribution.rateIntervalContributionSecond?.toString(),
            intervalContributionSecond: this.contract.perecoContribution.intervalContributionSecond?.toString(),
            ceilingIntervalContributionThird: this.contract.perecoContribution.ceilingIntervalContributionThird?.toString(),
            rateIntervalContributionThird: this.contract.perecoContribution.rateIntervalContributionThird?.toString(),
            intervalContributionThird: this.contract.perecoContribution.intervalContributionThird?.toString(),
            perecoInterestAccepted: this.contract.perecoContribution.perecoInterestAccepted?.toString(),
            perecoVoluntaryDepositAccepted: this.contract.perecoContribution.perecoVoluntaryDepositAccepted?.toString(),
            perecoProfitSharingAccepted: this.contract.perecoContribution.perecoProfitSharingAccepted?.toString(),
            perecoTimeSavingAccountAccepted: this.contract.perecoContribution.perecoTimeSavingAccountAccepted?.toString(),
        });
    }

    initDefaultValuesForCheckedPeePereco(): void {
        this.peeChecked = this.contract.peeContribution != null;
        this.percoChecked = this.contract.perecoContribution != null;

        this.noPlanSelected();

        this.selectedAbondementTypePEE = this.contract.peeContribution != null ? this.contract.peeContribution.contributionType == "SIMPLE" ? 'sm' :
            this.contract.peeContribution.contributionType == "INTERVAL" ? "pl" : "an" : "";


        this.selectedAbondementTypePERCO = this.contract.perecoContribution != null ? this.contract.perecoContribution.contributionType == "SIMPLE" ? 'sm' :
            this.contract.perecoContribution.contributionType == "INTERVAL" ? "pl" : "an" : "";

    }


    selectedAbondementTypePEE: string = ''
    selectedAbondementTypePERCO: string = ''

    peeChecked: boolean = false
    percoChecked: boolean = false


    companyForm = this.formBuilder.group({
        companyName: ['', Validators.required],
        legalForm: ['', Validators.required],
        siret: ['', [Validators.required, Validators.maxLength(13), Validators.minLength(13)]],
        siren: ['', Validators.required],
        businessActivity: ['', Validators.required],
        businessAddress: ['', Validators.required],
        workforce: ["", [Validators.required, Validators.min(1)]],
        totalWages: ["", [Validators.required, Validators.min(1)]],
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
        countryOfBirth: [{
            name: "",
            alpha2Code: "",
            alpha3Code: "",
            numericCode: "",
            callingCode: ""
        }, Validators.required],
        countryOfResidence: [{name: "", alpha2Code: "", alpha3Code: "", numericCode: "", callingCode: ""}],
        executive: ["", Validators.required],
        eligibility: ["ONE_MONTH", Validators.required],
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

    perecoContributionForm = this.formBuilder.group({
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
        perecoInterestAccepted: ['', Validators.required],
        perecoVoluntaryDepositAccepted: ['', Validators.required],
        perecoProfitSharingAccepted: ['', Validators.required],
        perecoTimeSavingAccountAccepted: ['', Validators.required],

    })

    onAbondementPeeTypeChange(event): void {
        this.selectedAbondementTypePEE = event.value
        this.peeContributionForm.controls['rateSimpleContribution'].reset()
        this.peeContributionForm.controls['ceilingSimpleContribution'].reset()
        this.peeContributionForm.controls['rateSeniorityContribution'].reset()
        this.peeContributionForm.controls['ceilingSeniorityContributionLessYear'].reset()
        this.peeContributionForm.controls['ceilingSeniorityContributionBetween1And3'].reset()
        this.peeContributionForm.controls['ceilingSeniorityContributionBetween3And5'].reset()
        this.peeContributionForm.controls['ceilingSeniorityContributionGreater5'].reset()
        this.peeContributionForm.controls['ceilingIntervalContributionFirst'].reset()
        this.peeContributionForm.controls['rateIntervalContributionFirst'].reset()
        this.peeContributionForm.controls['intervalContributionFirst'].reset()
        this.peeContributionForm.controls['ceilingIntervalContributionSecond'].reset()
        this.peeContributionForm.controls['rateIntervalContributionSecond'].reset()
        this.peeContributionForm.controls['intervalContributionSecond'].reset()
        this.peeContributionForm.controls['ceilingIntervalContributionThird'].reset()
        this.peeContributionForm.controls['rateIntervalContributionThird'].reset()
        this.peeContributionForm.controls['intervalContributionThird'].reset()


    }

    onAbondementPercoTypeChange(event): void {
        this.selectedAbondementTypePERCO = event.value
        this.perecoContributionForm.controls['rateSimpleContribution'].reset()
        this.perecoContributionForm.controls['ceilingSimpleContribution'].reset()
        this.perecoContributionForm.controls['rateSeniorityContribution'].reset()
        this.perecoContributionForm.controls['ceilingSeniorityContributionLessYear'].reset()
        this.perecoContributionForm.controls['ceilingSeniorityContributionBetween1And3'].reset()
        this.perecoContributionForm.controls['ceilingSeniorityContributionBetween3And5'].reset()
        this.perecoContributionForm.controls['ceilingSeniorityContributionGreater5'].reset()
        this.perecoContributionForm.controls['ceilingIntervalContributionFirst'].reset()
        this.perecoContributionForm.controls['rateIntervalContributionFirst'].reset()
        this.perecoContributionForm.controls['intervalContributionFirst'].reset()
        this.perecoContributionForm.controls['ceilingIntervalContributionSecond'].reset()
        this.perecoContributionForm.controls['rateIntervalContributionSecond'].reset()
        this.peeContributionForm.controls['intervalContributionSecond'].reset()
        this.perecoContributionForm.controls['ceilingIntervalContributionThird'].reset()
        this.perecoContributionForm.controls['rateIntervalContributionThird'].reset()
        this.perecoContributionForm.controls['intervalContributionThird'].reset()
    }

  onPeeCheckedChange(event):void{
    this.peeChecked =event.checked
  }
  onPercoCheckedChange(event):void{
    this.percoChecked =event.checked
  }

    noPlanSelected() {
        return !(this.peeChecked || this.percoChecked)
    }

    canSubmitForm(): boolean {

        if (this.companyForm.invalid) return false
        if (this.companySignatoryForm.invalid) return false

        let peeInterestChecked = this.peeContributionForm.get("peeInterestAccepted").value ? true : false
        let peeVoluntaryChecked = this.peeContributionForm.get("peeVoluntaryDepositAccepted").value ? true : false
        let peeProfitChecked = this.peeContributionForm.get("peeProfitSharingAccepted").value ? true : false
        let atLeastOnePeeAbondementIsChecked = peeInterestChecked || peeVoluntaryChecked || peeProfitChecked

        let perecoInterestChecked = this.perecoContributionForm.get("perecoInterestAccepted").value ? true : false
        let perecoVoluntaryChecked = this.perecoContributionForm.get("perecoVoluntaryDepositAccepted").value ? true : false
        let perecoProfitChecked = this.perecoContributionForm.get("perecoProfitSharingAccepted").value ? true : false
        let perecoTimeSavingChecked = this.perecoContributionForm.get("perecoTimeSavingAccountAccepted").value ? true : false
        let atLeastOnePerecoAbondementIsChecked = perecoInterestChecked || perecoVoluntaryChecked || perecoProfitChecked || perecoTimeSavingChecked
        let planForPeeChosen = this.selectedAbondementTypePEE ? true : false
        let planForPerecoChosen = this.selectedAbondementTypePERCO ? true : false


        if (this.peeChecked && this.percoChecked) {
            return atLeastOnePeeAbondementIsChecked && atLeastOnePerecoAbondementIsChecked && planForPeeChosen && planForPerecoChosen
        } else if (this.peeChecked) {
            return atLeastOnePeeAbondementIsChecked && planForPeeChosen
        } else if (this.percoChecked) {
            return atLeastOnePerecoAbondementIsChecked && planForPerecoChosen
        } else return false
    }


    onSubmit() {

        const newContract = {
            closingMonth: this.companyForm.value['closingMonth'],
            eligibility: this.companySignatoryForm.value['eligibility'],
            company: this.companyForm.value,
            companySignatory: {
                ...this.companySignatoryForm.value,
                countryOfBirth: this.companySignatoryForm.value.countryOfBirth?.alpha2Code,
                countryOfResidence: this.companySignatoryForm.value.countryOfResidence?.alpha2Code,
                dateOfBirth: formatDate(this.companySignatoryForm.value.dateOfBirth, "yyyy-MM-dd", "en-US")

            },
            peeContribution: this.peeContributionForm.value,
            perecoContribution: this.perecoContributionForm.value
        }

        this.contract != null ?
            this.contractService.updateContract(newContract).subscribe(
                data => {

                    this.dialog.open(SuccessComponent, {
                        data: {
                            title: 'Contrat mis a jour avec succès',
                            body: 'Votre contrat a été mis a jour avec succès et vos choix ont bien été enregistrés'
                        },
                    })
                },
                errors => {

                    this.dialog.open(ErrorComponent, {
                        data: {
                            title: 'Erreur serveur',
                            body: 'le serveur a rencontré des erreurs'
                        },
                    })

                }
            ) :


            this.contractService.createContract(newContract).subscribe(
                data => {

                    this.dialog.open(SuccessComponent, {
                        data: {
                            title: 'Contrat créé avec succès',
                            body: 'Votre contrat a été créé avec succès et vos choix ont bien été enregistrés'
                        },
                    })
                },
                errors => {

                    this.dialog.open(ErrorComponent, {
                        data: {
                            title: 'Erreur serveur',
                            body: 'le serveur a rencontré des erreurs'
                        },
                    })

                }
            )

    }

}

