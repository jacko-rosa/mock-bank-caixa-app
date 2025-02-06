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

async function _getById(id: string): Promise<ClientDTO> {
    logInit('ClientService', 'getById', id);
    ClientValidator.validateId(id);
    const responseSQL = await ClientRepository.getById(id);
    const response = ClientMapper.sql_dto(responseSQL)
    logEnd('ClientService', 'getById', response);
    return response;
}

export const ClientService = {
    create: _create,
    getById: _getById
}
