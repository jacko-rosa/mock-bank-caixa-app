import bcrypt from 'bcrypt';
import { LoginRequest } from "../definition/authentication.definition";
import { response, ResponseStatus } from "../definition/utils.definition";
import { AuthenticationMapper } from '../mapper/authentication.maper';
import { ResponseMapper } from '../mapper/util.mapper';
import { ClientService } from "./client.service";
import { logEnd, logInit, throwError } from "./util.service";
import { AuthenticationRepository } from '../repository/authentication.repository';

async function login(request: LoginRequest): Promise<response | unknown> {
    logInit('AuthenticationService', 'login', request.clientId);
    let response = ResponseMapper.responseError('Error: invalid credentials', ResponseStatus.BAD_REQUEST);

    try {
        const user = await ClientService.getById(request.clientId);
        if (!user) {
            return response;
        }
        const isMatch = await bcrypt.compare(request.clientSecret, user.password);
        if (isMatch) {
            const token = AuthenticationMapper.generetaToken(user);
            const authenticationSQL = AuthenticationMapper.token_sql(token);
            AuthenticationRepository.create(authenticationSQL);
            response = ResponseMapper.responseSucess({ token: token }, ResponseStatus.OK)
        } else {
            return response;
        }

        logEnd('AuthenticationService', 'login', response);
        return response;
    } catch (error) {
        throwError('Error validating credentials', error)
    }
}

export const AuthenticationService = {
    login
}