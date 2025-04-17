import { BalanceDomain, BalanceDto } from "../definition/balance.definition";
import { logEnd, logInit } from "../service/util.service";

const CLAZZ = 'BalanceMapper';

function _toDto(domain: BalanceDomain): BalanceDto {
    const METHOD = 'toDto';
    logInit(CLAZZ, METHOD, domain);
    const dto = {
        amount: domain.amount,
        currency: domain.currency,
    } as BalanceDto
    logEnd(CLAZZ, METHOD, dto);
    return dto;
}

export const BalanceMapper = {
    toDto: _toDto,
}