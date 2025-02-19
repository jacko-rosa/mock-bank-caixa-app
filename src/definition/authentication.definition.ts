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