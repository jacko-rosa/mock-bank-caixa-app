export interface LoginRequest {
    document: string;
    password: string;
}

export interface SiginupRequest {
    username: string;
    password: string;
    document: string;
}

export interface Token_body {
    username: string;
    client_id: string;
    time: Date;
    expirate: number;
}

/**
 * definitions: Authorization
 * Objeto resumido para fiuns didáticos
 * client_id substituiído por document
 * como concentmiento esta sendo abstraído, esta sendo passado o account_id no token
 */
export interface Token_body_OpenFinance {
    client_info: {
        client_id: string;
        compe_code: string;
        account_id?: string;
    },
    receptor_info: {
        client_id: string;
        roles: string[];
    },
    iat: number,
    exp: number,
}

export interface AuthenticationSQL {
    client_id: string,
    token: string,
    create_date: string
}

const key = process.env.NEXT_PUBLIC_JWT_SECRET as string;
const expire = 5 * (60 * 1000);

export const AuthenticationDefinitions = {
    key,
    expire
}