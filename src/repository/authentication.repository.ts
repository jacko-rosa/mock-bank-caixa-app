import { db } from "@vercel/postgres";
import { AuthenticationSQL } from "../definition/authentication.definition";
import { logEnd, logInit } from "../service/util.service";

async function _create(body: AuthenticationSQL): Promise<AuthenticationSQL> {
    logInit('AuthenticationRepository', 'create', body)
    const client = await db.connect();

    const data = await client.sql`
        INSERT INTO authentication (client_id, token, create_date)
        VALUES (${body.client_id}, ${body.token}, ${body.create_date})
        RETURNING client_id;`;

    const client_id = data.rows[0].id;
    const response = { ...body, client_id }

    logEnd('AuthenticationRepository', 'create', response)
    return response;
}

async function _update(body: AuthenticationSQL): Promise<AuthenticationSQL> {
    logInit('AuthenticationRepository', 'update', body)
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

    logEnd('AuthenticationRepository', 'update', response)
    return response;
}

export const AuthenticationRepository = {
    create: _create,
    update: _update
}