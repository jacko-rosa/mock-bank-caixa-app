import { AccountDomain, AccountDto } from "../definition/account.definition";
import { logEnd, logInit } from "../service/util.service";

const CLAZZ = 'AccountMapper';

function _toDto(domain: AccountDomain): AccountDto {
    const METHOD = 'toDto';
    logInit(CLAZZ, METHOD, domain);
    const dto = {
        accountId: domain.id,
        document: domain.document,
        compeCode: domain.compeCode,
        branchCode: domain.agency,
        number: domain.number,
        digit: domain.checkDigit,
        type: domain.type
    }
    logEnd(CLAZZ, METHOD, dto);
    return dto;
}

export const AccountMapper = {
    toDto: _toDto,
}