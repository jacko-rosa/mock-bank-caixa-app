import { ClientDTO } from "@/src/definition/cliente.definition";
import { ResponseStatus } from "@/src/definition/utils.definition";
import { ClientService } from "@/src/service/client.service";
import { logEnd, logInit } from "@/src/service/util.service";
import { NextRequest } from "next/server";

async function _create(request: NextRequest) {
    const body: ClientDTO = await request.json();
    logInit('ClientRoute', 'create', body);

    return ClientService.create(body).then(response => {
        const json = Response.json(response, ResponseStatus.OK);
        logEnd('ClientRoute', 'create', json);
        return json;
    }).catch((error) => {
        logEnd('ClientRoute', 'create', error);
        return Response.json({ error: 'Invalid request body' }, ResponseStatus.BAD_REQUEST);
    });
}


export async function POST(request: NextRequest) {
    return _create(request);
}