'use service'

import bcrypt from 'bcrypt';
import {
    PropCreateclientDTO,
    PropCreateclientSQL
} from "../definition/cliente.definitions";
import { ClientRepository } from "../repository/client.repository";
import { ClientValidator } from "../validator/client.validator";
import { logEnd, logInit } from './util.service';


async function create(body: PropCreateclientDTO) {
    logInit('ClientService', 'create', body);
    ClientValidator.validateRequest(body);

    const bodySQL = {
        client_secret: await bcrypt.hash(body.password, 10),
        name: body.name,
        document: body.document,
    } as PropCreateclientSQL

    const response = await ClientRepository.create(bodySQL);
    logEnd('ClientService', 'create', response);
    return response;
}

export const ClientService = {
    create
}
