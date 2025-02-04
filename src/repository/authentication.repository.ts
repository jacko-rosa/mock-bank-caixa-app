import { db } from "@vercel/postgres";
import { AuthenticationSQL } from "../definition/authentication.definition";
import { logEnd, logInit, throwError } from "../service/util.service";

async function _create(body: AuthenticationSQL): Promise<AuthenticationSQL | undefined> {
    logInit('AuthenticationRepository', 'create', body)
    const client = await db.connect();

    try {
        const data = await client.sql`
        INSERT INTO authentication (client_id, token, create_date)
        VALUES (${body.client_id}, ${body.token}, ${body.create_date})
        RETURNING client_id;`;

        const client_id = data.rows[0].id;
        const response = { ...body, client_id }

        logEnd('AuthenticationRepository', 'create', response)
        return response;
    } catch (error) {
        const msgError = `Database Error: Failed to Create Authentication:`;
        throwError(msgError, error)
    }
}

export const AuthenticationRepository = {
    create: _create
}