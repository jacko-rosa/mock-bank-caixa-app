'use server'

import { PropCreateclientDTO } from "@/src/definition/cliente.definitions";
import { ResponseStatus } from "@/src/definition/response-status.definition";
import { ClientService } from "@/src/service/client.service";
import { logEnd, logInit } from "@/src/service/util.service";
import { NextRequest } from "next/server";

async function siginUp(request: NextRequest) {
    const body: PropCreateclientDTO = await request.json();
    logInit('ClientRoute', 'siginUp', body);

    return ClientService.create(body).then((response) => {
        const json = Response.json({ token: 'meu token via tela de cliente', response }, ResponseStatus.OK);
        logEnd('ClientRoute', 'siginUp', json);
        return json;
    }).catch((error) => {
        logEnd('ClientRoute', 'siginUp', error);
        return Response.json({ error: 'Invalid request body' }, ResponseStatus.BAD_REQUEST);
    });
}

export async function POST(request: NextRequest) {
    return siginUp(request);
}