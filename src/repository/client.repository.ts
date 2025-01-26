'use server'

import { sql } from "@vercel/postgres";
import { PropCreateclientSQL } from "../definition/cliente.definitions";


async function create(body: PropCreateclientSQL) {
    try {
        await sql`
        INSERT INTO client (client_secret, name, document)
        VALUES (${body.client_secret}, ${body.name}, ${body.name})`;
    } catch (error) {
        return Error('Database Error: Failed to Create Client.');
    }
}

export const ClientRepository = {
    create
}