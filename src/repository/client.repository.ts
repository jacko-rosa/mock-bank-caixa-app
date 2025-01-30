import { db } from "@vercel/postgres";
import { PropCreateclientSQL } from "../definition/cliente.definitions";
import { logEnd, throwError } from "../service/util.service";


async function create(body: PropCreateclientSQL): Promise<PropCreateclientSQL | undefined> {
    const client = await db.connect();

    try {
        const data = await client.sql`
        INSERT INTO client (client_secret, name, document)
        VALUES (${body.client_secret}, ${body.name}, ${body.document})
        RETURNING id`;

        const client_id = data.rows[0].id;
        const response = { ...body, client_id }

        logEnd('ClientRepository', 'create', response)
        return response;
    } catch (error) {
        const msgError = `Database Error: Failed to Create Client:`;
        throwError(msgError, error)
    }
}

export const ClientRepository = {
    create
}