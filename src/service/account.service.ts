'use server';

import { AccountDto } from '../definition/account.definition';
import { AccountMapper } from '../mapper/account.mapper';
import { getAccoutDomainByDocument } from '../repository/account.repository';
import { logEnd, logInit } from './util.service';

const CLAZZ = 'AccountService';

export async function getAccoutDtoByDocument(document: string): Promise<AccountDto[]> {
    const METHOD = 'getByDocument';
    logInit(CLAZZ, METHOD, document);
    const responsesSQL = await getAccoutDomainByDocument(document);
    const responses = responsesSQL.map((response) => AccountMapper.toDto(response));
    logEnd(CLAZZ, METHOD, responses);
    return responses as AccountDto[];
}
