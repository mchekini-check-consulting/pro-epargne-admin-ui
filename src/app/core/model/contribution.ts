export type ContributionType = {
    transactionId: number,
    amount: number,
    previousAmount: number,
    nextAmount: number,
    createdAt: string,
    type: string,
    comment: string,
    planType: string,
    contribution: {
        id: number,
        amount: number,
        status: "PENDING" | "APPROVED"
    }
};
