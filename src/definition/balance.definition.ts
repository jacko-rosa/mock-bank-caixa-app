export interface BalanceDto {
    amount: number
    currency: string
}

export interface BalanceDomain {
    id: string
    accountId: string
    amount: number
    currency: string
}