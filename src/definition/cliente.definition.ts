import { UUID } from "crypto"

export interface ClientDTO {
    id: UUID
    password: string,
    name: string,
    document: string
}

export interface ClientSQL {
    client_id: UUID
    client_secret: string,
    username: string,
    document: string
}