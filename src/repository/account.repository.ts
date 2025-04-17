'use server';

import { db } from "@vercel/postgres";
import { AccountDomain } from "../definition/account.definition";
import { logEnd, logInit } from "../service/util.service";

const CLAZZ = 'AccountRepository';

export async function getAccoutDomainByDocument(document: string): Promise<AccountDomain[]> {
    const METHOD = 'getByDocument';
    logInit(CLAZZ, METHOD, document)
    const client = await db.connect();

    const data = await client.sql`
        SELECT * 
        FROM account 
        WHERE 1=1
            AND document=${document};`;

    const response = data.rows as AccountDomain[];

    logEnd(CLAZZ, METHOD, response)
    client.release();
    return response;
}