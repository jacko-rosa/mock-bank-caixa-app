'use server';

import bcrypt from 'bcrypt';
import { ClientDTO } from "../definition/cliente.definition";
import { ClientMapper } from '../mapper/client.mapper';
import { createClientDomain, getClientDomainByDocument } from "../repository/client.repository";
import { ClientValidator } from "../validator/client.validator";
import { logEnd, logInit } from './util.service';

const CLAZZ = 'ClientService';

export async function createClientDto(body: ClientDTO): Promise<ClientDTO> {
    const METHOD = 'createClientDto';
    logInit(CLAZZ, METHOD, body);
    ClientValidator.validateCreateRequest(body);
    body.password = await bcrypt.hash(body.password, 10);
    const bodySQL = ClientMapper.dto_sql(body)
    const response = await createClientDomain(bodySQL);
    body.id = response.client_id;
    logEnd(CLAZZ, METHOD, response);
    return body;
}

export async function getClientDtoByDocument(document: string): Promise<ClientDTO> {
    const METHOD = 'getClientDtoByDocument';
    logInit(CLAZZ, METHOD, document);
    ClientValidator.validateCPF_CNPJ(document);
    const responseSQL = await getClientDomainByDocument(document);
    const response = ClientMapper.sql_dto(responseSQL)
    logEnd(CLAZZ, METHOD, response);
    return response;
}
