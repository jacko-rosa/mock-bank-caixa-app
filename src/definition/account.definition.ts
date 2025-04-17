export interface AccountDto {
    accountId?: string;
    document: string // CPF/CNPJ
    compeCode: string
    branchCode: string
    number: string
    digit: string
    type?: string
}
export interface AccountDomain {
    id: string
    type: string
    agency: string
    number: string
    checkDigit: string
    brandName: string
    companyCnpj: string
    compeCode: string
    document: string
}