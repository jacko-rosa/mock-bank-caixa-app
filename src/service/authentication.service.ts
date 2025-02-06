import bcrypt from 'bcrypt';
import { LoginRequest, SiginupRequest } from "../definition/authentication.definition";
import { Response, ResponseStatus } from "../definition/utils.definition";
import { AuthenticationMapper } from '../mapper/authentication.maper';
import { ResponseMapper } from '../mapper/util.mapper';
import { AuthenticationRepository } from '../repository/authentication.repository';
import { ClientService } from "./client.service";
import { logEnd, logInit } from "./util.service";

const invalidCredential = ResponseMapper.responseError('Error: invalid credentials', ResponseStatus.BAD_REQUEST);

async function _signup(request: SiginupRequest): Promise<Response> {
    logInit('AuthenticationService', 'signup', request);
    let response = invalidCredential;

    try {
        const client = AuthenticationMapper.siginup_client(request)
    await ClientService.create(client).then(user => {
        const token = AuthenticationMapper.generetaToken(user);
        const authenticationSQL = AuthenticationMapper.token_sql(token);
        return AuthenticationRepository.create(authenticationSQL).then(() => {
            return response = ResponseMapper.responseSucess({ token: token }, ResponseStatus.OK)
        });
    });
    } catch {
        return invalidCredential;
    }

    logEnd('AuthenticationService', 'signup', response);
    return response;
}

async function _login(request: LoginRequest): Promise<Response> {
    logInit('AuthenticationService', 'login', request.clientId);
    let response = invalidCredential;
    try {
        response = await ClientService.getById(request.clientId)
            .then(user => bcrypt.compare(request.clientSecret, user.password)
                .then(isMatch => {
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
    } catch {
        return invalidCredential;
    }

    logEnd('AuthenticationService', 'login', response);
    return response;
}

export const AuthenticationService = {
    signup: _signup,
    login: _login
}