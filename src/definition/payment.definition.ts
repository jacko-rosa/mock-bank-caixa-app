export interface PaymentDto {
    paymentId: string;
    endToEndId: string;
    consentId?: string;
    creationDateTime: string;
    statusUpdateDateTime: string;
    proxy?: string;
    ibgeTownCode?: string;
    status: string;
    rejectionReason?: RejectionReason;
    localInstrument: string;
    cnpjInitiator: string;
    payment: Payment;
    transactionIdentification?: string;
    remittanceInformation?: string;
    creditorAccount: Account;
    debtorAccount: Account;
    authorisationFlow?: string;
}

export interface RejectionReason {
    code: string;
    detail: string;
}

export interface Payment {
    amount: number;
    currency: string;
}

export interface Account {
    ispb: string;
    issuer: string;
    number: string;
    accountType: string;
}

export interface RequestPayment {
    endToEndId: string;
    localInstrument: string;
    payment: Payment;
    creditorAccount: Account;
    remittanceInformation?: string;
    qrCode?: string;
    proxy?: string;
    cnpjInitiator: string;
    transactionIdentification?: string;
    ibgeTownCode?: string;
    authorisationFlow?: string;
    consentId?: string;
}

export interface PaymentDomain {
    endToEnd: string;
    status?: string;
    idReject: string;
    instrument: string;
    cnpjInitiator: string;
    paymenteAmount: number;
    transactionId: string;
    description: string;
    creditorIspb: string;
    creditorAgency: string;
    creditorAccount: string;
    creditorAccountType: string;
    debtorAccountId: string;
    id?: string;
    dateCreate: Date;
    dateUpdate: Date;
}
