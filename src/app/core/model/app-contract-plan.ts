export interface Contract {
    contractId: number;
    createdAt: string;
    closingMonth: string;
    eligibility: string;
    company: Company;
    companySignatory: CompanySignatory;
    peeContribution:PeePlan;
    perecoContribution: PerecoPlan;
}

export interface CompanySignatory {
    lastName: string;
    firstName: string;
    jobTitle: string;
    email: string;
    phone: string;
    socialSecurityNumber: string;
    countryOfBirth: string;
    countryOfResidence: string;
    dateOfBirth: string;
    executive: boolean;

}


export interface Company {
    siren: string;
    companyName: string;
    address: string;
    siret: string;
    businessAddress: string;
    businessActivity: string;
    workforce: number;
    totalWages: number;
    legalForm: string;
}

export interface PeePlan {

    contributionType: string;
    rateSimpleContribution: number|null;
    ceilingSimpleContribution:  number|null;
    rateSeniorityContribution:  number|null;
    ceilingSeniorityContributionLessYear: number|null;
    ceilingSeniorityContributionBetween1And3: number|null;
    ceilingSeniorityContributionBetween3And5: number|null;
    ceilingSeniorityContributionGreater5: number|null;
    ceilingIntervalContributionFirst:  number|null;
    rateIntervalContributionFirst:  number|null;
    intervalContributionFirst:  number|null;
    ceilingIntervalContributionSecond:  number|null;
    rateIntervalContributionSecond:  number|null;
    intervalContributionSecond:  number|null;
    ceilingIntervalContributionThird:  number|null;
    rateIntervalContributionThird:  number|null;
    intervalContributionThird:  number|null;
    peeInterestAccepted:  boolean|null;
    peeVoluntaryDepositAccepted: boolean|null;
    peeProfitSharingAccepted: boolean|null;

}

export interface PerecoPlan {

    contributionType: string;
    rateSimpleContribution: number|null;
    ceilingSimpleContribution:  number|null;
    rateSeniorityContribution:  number|null;
    ceilingSeniorityContributionLessYear: number|null;
    ceilingSeniorityContributionBetween1And3: number|null;
    ceilingSeniorityContributionBetween3And5: number|null;
    ceilingSeniorityContributionGreater5: number|null;
    ceilingIntervalContributionFirst:  number|null;
    rateIntervalContributionFirst:  number|null;
    intervalContributionFirst:  number|null;
    ceilingIntervalContributionSecond:  number|null;
    rateIntervalContributionSecond:  number|null;
    intervalContributionSecond:  number|null;
    ceilingIntervalContributionThird:  number|null;
    rateIntervalContributionThird:  number|null;
    intervalContributionThird:  number|null;
    perecoInterestAccepted:  boolean|null;
    perecoVoluntaryDepositAccepted: boolean|null;
    perecoProfitSharingAccepted: boolean|null;
    perecoTimeSavingAccountAccepted: boolean|null;
}
