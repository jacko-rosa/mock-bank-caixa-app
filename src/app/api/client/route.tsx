import { NextRequest } from "next/server";
import { PropCreateclientDTO } from "@/src/definition/cliente.definitions";
import { ClientService } from "@/src/service/client.service";

export async function create(request: NextRequest) {
    const body: PropCreateclientDTO = await request.json();
    try {
        ClientService.create(body);
    } catch (error) {
        return Response.json({ error: 'Invalid request body' }, { status: 400 }); //fixme
    }

}