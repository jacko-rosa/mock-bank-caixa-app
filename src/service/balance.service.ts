'use server';

import { BalanceDto } from '../definition/balance.definition';
import { BalanceMapper } from '../mapper/balance.mapper';
import { getBalanceDomainByAccountId, patchBalanceDomainByAccountId } from '../repository/balance.repository';
import { logEnd, logInit } from './util.service';

const CLAZZ = 'BalanceService';

export async function getBalanceDtoByAccountId(accountId: string): Promise<BalanceDto> {
    const METHOD = 'getBalanceDtoByAccountId';
    logInit(CLAZZ, METHOD, accountId);
    const responseSQL = await getBalanceDomainByAccountId(accountId);
    const response = BalanceMapper.toDto(responseSQL);
    logEnd(CLAZZ, METHOD, response);
    return response;
}

export async function patchBalanceDtoByAccountId(accountId: string, amount: number): Promise<BalanceDto> {
    const METHOD = 'patchBalanceDtoByAccountId';
    logInit(CLAZZ, METHOD, accountId);
    const balanceSQL = await getBalanceDomainByAccountId(accountId);
    if (balanceSQL.amount < amount) {
        throw new Error("Saldo isuficiente")
    }
    const newAmount = balanceSQL.amount - amount;
    const updatedBalanceSQL = await patchBalanceDomainByAccountId(accountId, newAmount);
    const response = BalanceMapper.toDto(updatedBalanceSQL);
    logEnd(CLAZZ, METHOD, response);
    return response;
}
