'use server';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { ApiError } from 'next/dist/server/api-utils';
import { LoginRequest, SiginupRequest, Token_body, Token_body_OpenFinance } from "../definition/authentication.definition";
import { ClientDTO } from '../definition/cliente.definition';
import { Response, ResponseStatus } from "../definition/utils.definition";
import { AuthenticationMapper } from '../mapper/authentication.maper';
import { ResponseMapper } from '../mapper/util.mapper';
import { create as authentication_create, getById as authentication_getById, update as authentication_update } from '../repository/authentication.repository';
import { createClientDto, getClientDtoByDocument } from "./client.service";
import { logEnd, logInit, logMid, throwError } from "./util.service";

const CLAZZ = 'AuthenticationService';
const invalidCredential = ResponseMapper.responseError('Error: invalid credentials', ResponseStatus.BAD_REQUEST);
const unauthorized = ResponseMapper.responseSucess({ authorized: false }, ResponseStatus.UNAUTHORIZED);

function _getExpirateDate(timestamp: Date, milliseconds: number): Date {
    const METHOD = 'getExpirateDate';
    logInit(CLAZZ, METHOD, { timestamp: timestamp, milliseconds: milliseconds });
    const dateObj = new Date(timestamp);
    const date = new Date(dateObj.getTime() + milliseconds);
    logEnd(CLAZZ, METHOD, date);
    return date;
}

export async function signup(request: SiginupRequest): Promise<Response> {
    const METHOD = 'signup';
    logInit(CLAZZ, METHOD, request);
    const response = invalidCredential;
    const client = AuthenticationMapper.siginup_client(request)
    await createClientDto(client).then(user => {
        const token = AuthenticationMapper.generetaToken(user);
        const authenticationSQL = AuthenticationMapper.token_sql(token);
        const result = authentication_create(authenticationSQL)
        logEnd(CLAZZ, METHOD, result);
        return result;
    });
    logEnd(CLAZZ, METHOD, response);
    return response;
}

export async function login(request: LoginRequest): Promise<Response> {
    const METHOD = 'login';
    logInit(CLAZZ, METHOD, request);
    let response = invalidCredential;
    response = await getClientDtoByDocument(request.document).then(user =>
        bcrypt.compare(request.password, user.password).then(isMatch => {
            if (isMatch) {
                const token = AuthenticationMapper.generetaToken(user);
                const authenticationSQL = AuthenticationMapper.token_sql(token);
                return authentication_update(authenticationSQL)
                    .then(() => ResponseMapper.responseSucess({ token: token }, ResponseStatus.OK));
            } else {
                return invalidCredential;
            }
        })
    );
    logEnd(CLAZZ, METHOD, response);
    return response;
}

export async function authorize(request: string | null): Promise<Response> {
    const METHOD = 'authorize';
    logInit(CLAZZ, METHOD, request?.slice(0, 10) + '...');
    if (!request) {
        logEnd(CLAZZ, METHOD, 'Request is null or empty');
        return unauthorized;
    }
    const token_body = jwt.decode(request) as Token_body | null;
    if (!token_body) {
        logEnd(CLAZZ, METHOD, 'Invalid JWT token');
        return unauthorized;
    }
    logMid(CLAZZ, METHOD, 'jwt.decode', token_body);
    const response = await authentication_getById(token_body.client_id).then(token_sql => {
        logMid(CLAZZ, METHOD, 'getById.then', 'create_date:' + token_sql.create_date);
        if (token_sql.token === request) {
            const expirate = _getExpirateDate(token_body.time, token_body.expirate);
            logMid(CLAZZ, METHOD, 'getExpirateDate', expirate);
            if (new Date() > expirate) {
                return unauthorized;
            }
            return ResponseMapper.responseSucess({ authorized: true, client_id: token_body.client_id }, ResponseStatus.OK);
        } else {
            return unauthorized;
        }
    });
    logEnd(CLAZZ, METHOD, response);
    return response;
}

export async function authorizeOpenFinance(token: string | null): Promise<ClientDTO> {
    const METHOD = 'authorizeOpenFinance';
    try {
        logInit(CLAZZ, METHOD, { token });
        // validar token via TLS junto ao bacen
        // pra fins didáticos apenas validaremos que o receptor_info.client_id é igual ao client_id específico
        const token_body = jwt.decode(String(token).replace('Bearer', '')) as Token_body_OpenFinance;
        logMid(CLAZZ, METHOD, 'jwt.decode', token_body);
        if (token_body.receptor_info.client_id != '77f62a78-a0bd-4af4-bde9-09348e95390e') {
            throw new ApiError(401, 'Unauthorized: invalid receptor')
        }
        const response = await getClientDtoByDocument(token_body.client_info.client_id)
        logEnd(CLAZZ, METHOD, response);
        return response;
    } catch (error) {
        return throwError(error as Error, CLAZZ, METHOD);
    }
}