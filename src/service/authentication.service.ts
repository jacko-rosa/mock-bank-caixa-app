import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { LoginRequest, SiginupRequest, Token_body } from "../definition/authentication.definition";
import { Response, ResponseStatus } from "../definition/utils.definition";
import { AuthenticationMapper } from '../mapper/authentication.maper';
import { ResponseMapper } from '../mapper/util.mapper';
import { AuthenticationRepository } from '../repository/authentication.repository';
import { ClientService } from "./client.service";
import { logEnd, logInit, logMid } from "./util.service";

const SERVICE = 'AuthenticationService';
const invalidCredential = ResponseMapper.responseError('Error: invalid credentials', ResponseStatus.BAD_REQUEST);
const unauthorized = ResponseMapper.responseSucess({ authorized: false }, ResponseStatus.UNAUTHORIZED);

function _getExpirateDate(timestamp: Date, milliseconds: number): Date {
    logInit(SERVICE, 'getExpirateDate', [`timestamp: ${timestamp}`, `milliseconds: ${milliseconds}`]);
    const dateObj = new Date(timestamp);
    const date = new Date(dateObj.getTime() + milliseconds);
    logEnd(SERVICE, 'getExpirateDate', date);
    return date;
}

async function _signup(request: SiginupRequest): Promise<Response> {
    logInit(SERVICE, 'signup', request);
    let response = invalidCredential;

    const client = AuthenticationMapper.siginup_client(request)
    await ClientService.create(client).then(user => {
        const token = AuthenticationMapper.generetaToken(user);
        const authenticationSQL = AuthenticationMapper.token_sql(token);
        return AuthenticationRepository.create(authenticationSQL)
    });


    logEnd(SERVICE, 'signup', response);
    return response;
}

async function _login(request: LoginRequest): Promise<Response> {
    logInit(SERVICE, 'login', request);
    let response = invalidCredential;
    response = await ClientService.getByDocument(request.document).then(user =>
        bcrypt.compare(request.password, user.password).then(isMatch => {
            if (isMatch) {
                const token = AuthenticationMapper.generetaToken(user);
                const authenticationSQL = AuthenticationMapper.token_sql(token);
                return AuthenticationRepository.update(authenticationSQL)
                    .then(() => ResponseMapper.responseSucess({ token: token }, ResponseStatus.OK));
            } else {
                return invalidCredential;
            }
        })
    );


    logEnd(SERVICE, 'login', response);
    return response;
}

async function _authorize(request: string | null): Promise<Response> {
    logInit(SERVICE, 'authorize', request!.slice(0, 10) + '...');
    const token_body = jwt.decode(request!) as Token_body;
    logMid(SERVICE, 'authorize', 'jwt.decode', token_body);

    const response = await AuthenticationRepository.getById(token_body.client_id).then(token_sql => {
        logMid(SERVICE, 'authorize', 'getById.then', 'create_date:' + token_sql.create_date);
        if (token_sql.token === request) {
            const expirate = _getExpirateDate(token_body.time, token_body.expirate);
            logMid(SERVICE, 'authorize', 'getExpirateDate', expirate);
            if (new Date() > expirate) {
                return unauthorized;
            }
            return ResponseMapper.responseSucess({ authorized: true, client_id: token_body.client_id }, ResponseStatus.OK);
        } else {
            return unauthorized;
        }
    })


    logEnd(SERVICE, 'login', response);
    return response;

}

export const AuthenticationService = {
    signup: _signup,
    login: _login,
    authorize: _authorize
};