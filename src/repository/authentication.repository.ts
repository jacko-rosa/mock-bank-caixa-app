'use server';

import { db } from "@vercel/postgres";
import { AuthenticationSQL } from "../definition/authentication.definition";
import { logEnd, logInit } from "../service/util.service";

const REPOSITORY = 'AuthenticationRepository';

export async function create(body: AuthenticationSQL): Promise<AuthenticationSQL> {
    logInit(REPOSITORY, 'create', body)
    const client = await db.connect();

    const data = await client.sql`
        INSERT INTO authentication (client_id, token, create_date)
        VALUES (${body.client_id}, ${body.token}, ${body.create_date})
        RETURNING client_id;`;

    const client_id = data.rows[0].id;
    const response = { ...body, client_id }

    logEnd(REPOSITORY, 'create', response)
    client.release();
    return response;
}

export async function update(body: AuthenticationSQL): Promise<AuthenticationSQL> {
    logInit(REPOSITORY, 'update', body)
    const client = await db.connect();

    const data = await client.sql`
        UPDATE authentication
        SET 
            token = ${body.token},
            create_date = ${body.create_date}
        WHERE client_id = ${body.client_id}
        RETURNING client_id;`;

    const client_id = data.rows[0].id;
    const response = { ...body, client_id }

    logEnd(REPOSITORY, 'update', response)
    client.release();
    return response;
}

export async function getById(id: string): Promise<AuthenticationSQL> {
    logInit(REPOSITORY, 'getById', id)
    const client = await db.connect();

    const data = await client.sql`
        SELECT * FROM authentication
        WHERE client_id = ${id}`;

    const response = data.rows[0] as AuthenticationSQL;

    logEnd(REPOSITORY, 'getById', response)
    client.release();
    return response;
}