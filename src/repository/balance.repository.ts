'use server';

import { db } from "@vercel/postgres";
import { BalanceDomain } from "../definition/balance.definition";
import { logEnd, logInit } from "../service/util.service";

const CLAZZ = 'BalanceRepository';

export async function getBalanceDomainByAccountId(accountId: string): Promise<BalanceDomain> {
    const METHOD = 'getBalanceDomainByAccountId';
    logInit(CLAZZ, METHOD, accountId)
    const connection = await db.connect();

    const data = await connection.sql`
        SELECT 
            * 
        FROM "balance"
        WHERE 1=1
            AND "accountId"=${accountId};`;

    const response = data.rows[0] as BalanceDomain;
    logEnd(CLAZZ, METHOD, response)
    connection.release();
    return response;
}

export async function patchBalanceDomainByAccountId(accountId: string, newAmount: number) {
    const METHOD = 'patchBalanceDomainByAccountId';
    logInit(CLAZZ, METHOD, accountId)
    const connection = await db.connect();

    const data = await connection.sql`
        UPDATE "public"."balance" 
        SET "amount" = ${newAmount}  
        WHERE 1=1
            AND "accountId" = ${accountId}
        RETURNING *;`;

    const response = data.rows[0] as BalanceDomain;
    logEnd(CLAZZ, METHOD, response)
    connection.release();
    return response;
}