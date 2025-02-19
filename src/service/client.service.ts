'use service'

import bcrypt from 'bcrypt';
import {
    ClientDTO
} from "../definition/cliente.definition";
import { ClientMapper } from '../mapper/client.mapper';
import { ClientRepository } from "../repository/client.repository";
import { ClientValidator } from "../validator/client.validator";
import { logEnd, logInit } from './util.service';


async function _create(body: ClientDTO): Promise<ClientDTO> {
    logInit('ClientService', 'create', body);
    ClientValidator.validateCreateRequest(body);
    body.password = await bcrypt.hash(body.password, 10);
    const bodySQL = ClientMapper.dto_sql(body)
    const response = await ClientRepository.create(bodySQL);
    body.id = response.client_id;
    logEnd('ClientService', 'create', response);
    return body;
}

async function _getByDocument(document: string): Promise<ClientDTO> {
    logInit('ClientService', 'getByDocument', document);
    ClientValidator.validateCPF_CNPJ(document);
    const responseSQL = await ClientRepository.getByDocument(document);
    const response = ClientMapper.sql_dto(responseSQL)
    logEnd('ClientService', 'getByDocument', response);
    return response;
}

export const ClientService = {
    create: _create,
    getByDocument: _getByDocument
}
