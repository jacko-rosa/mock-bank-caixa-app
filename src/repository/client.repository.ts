import { db } from "@vercel/postgres";
import { ClientSQL } from "../definition/cliente.definition";
import { logEnd, logInit } from "../service/util.service";


async function _create(body: ClientSQL): Promise<ClientSQL> {
    logInit('ClientRepository', 'create', body)
    const client = await db.connect();

    const data = await client.sql`
        INSERT INTO client (client_secret, username, document)
        VALUES (${body.client_secret}, ${body.username}, ${body.document})
        RETURNING id;`;

    const client_id = data.rows[0].id;
    const response = { ...body, client_id }

    logEnd('ClientRepository', 'create', response)
    client.release();
    return response;

}

async function _getByDocument(document: string): Promise<ClientSQL> {
    logInit('ClientRepository', 'getByDocument', document)
    const client = await db.connect();

    const data = await client.sql`
        SELECT * 
        FROM client 
        WHERE 1=1
            AND document=${document};`;

    const response: ClientSQL = {
        client_id: data.rows[0].id,
        client_secret: data.rows[0].client_secret,
        username: data.rows[0].username,
        document: data.rows[0].document
    };

    logEnd('ClientRepository', 'getByDocument', response)
    client.release();
    return response;
}

async function _delete(id: string): Promise<boolean> {
    logInit('ClientRepository', 'delete', id)
    const client = await db.connect();

    const data = await client.sql`
        UPDATE CLIENT
        SET active = FALSE
        WHERE id=${id};`;

    const response = data.rows.length > 0

    logEnd('ClientRepository', 'delete', response)
    client.release();
    return response;
}

export const ClientRepository = {
    create: _create,
    getByDocument: _getByDocument,
    delete: _delete
}