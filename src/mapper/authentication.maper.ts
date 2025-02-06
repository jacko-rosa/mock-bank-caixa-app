import jwt from 'jsonwebtoken';
import { AuthenticationDefinitions, AuthenticationSQL, SiginupRequest, Token_body } from "../definition/authentication.definition";
import { ClientDTO } from "../definition/cliente.definition";

function userToTokenBody(user: ClientDTO): Token_body {
    return {
        username: user.name,
        client_id: user.id,
        time: new Date(),
        expite: AuthenticationDefinitions.expire
    }
}

function generetaToken(user: ClientDTO): string {
    const token_body = userToTokenBody(user);
    const token_key = AuthenticationDefinitions.key;
    const token = jwt.sign(token_body, token_key, { algorithm: "HS256" });
    return token
}

function token_sql(token: string): AuthenticationSQL {
    const token_body = jwt.decode(token) as Token_body;
    return {
        client_id: token_body.client_id,
        token: token,
        create_date: token_body.time as unknown as string
    }
}

function siginup_client(siginup: SiginupRequest): ClientDTO {
    return {
        password: siginup.password,
        name: siginup.username,
        document: siginup.document
    } as ClientDTO
}

export const AuthenticationMapper = {
    generetaToken,
    token_sql,
    siginup_client
}