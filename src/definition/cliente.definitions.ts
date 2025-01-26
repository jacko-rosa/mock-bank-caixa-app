import { UUID } from "crypto"

export interface PropCreateclientDTO {
    id: UUID
    password: string,
    name: string,
    document: string
}

export interface PropCreateclientSQL {
    id: UUID
    client_secret: string,
    name: string,
    document: string
}