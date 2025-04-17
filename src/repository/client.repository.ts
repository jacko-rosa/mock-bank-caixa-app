'use server';

import { db } from "@vercel/postgres";
import { ClientSQL } from "../definition/cliente.definition";
import { logEnd, logInit } from "../service/util.service";

const CLAZZ = 'ClientRepository';

export async function createClientDomain(body: ClientSQL): Promise<ClientSQL> {
    const METHOD = 'createClientDomain';
    logInit(CLAZZ, METHOD, body)
    const connection = await db.connect();

    const data = await connection.sql`
        INSERT INTO client (client_secret, username, document)
        VALUES (${body.client_secret}, ${body.username}, ${body.document})
        RETURNING id;`;

    const client_id = data.rows[0].id;
    const response = { ...body, client_id }
    logEnd(CLAZZ, METHOD, response)
    connection.release();
    return response;
}

export async function getClientDomainByDocument(document: string): Promise<ClientSQL> {
    const METHOD = 'getClientDomainByDocument';
    logInit(CLAZZ, METHOD, { document })
    const connection = await db.connect();

    const data = await connection.sql`
        SELECT
            * 
        FROM client 
        WHERE 1=1
            AND document=${document};`;

    const response: ClientSQL = {
        client_id: data.rows[0].id,
        client_secret: data.rows[0].client_secret,
        username: data.rows[0].username,
        document: data.rows[0].document
    };
    logEnd(CLAZZ, METHOD, response)
    connection.release();
    return response;
}