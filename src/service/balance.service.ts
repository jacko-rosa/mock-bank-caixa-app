'use server';

import { BalanceDto } from '../definition/balance.definition';
import { BalanceMapper } from '../mapper/balance.mapper';
import { getBalanceDomainByAccountId } from '../repository/balance.repository';
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
