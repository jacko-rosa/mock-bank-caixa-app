import { ClientDTO, ClientSQL } from "../definition/cliente.definition";
import { logEnd, logInit } from "../service/util.service";

function sql_dto(domain: ClientSQL): ClientDTO {
    logInit('ClientMapper', 'sql_dto', domain);
    const dto = {
        id: domain.client_id,
        password: domain.client_secret,
        name: domain.username,
        document: domain.document
    }
    logEnd('ClientMapper', 'sql_dto', dto);
    return dto;
}

function dto_sql(dto: ClientDTO) {
    logInit('ClientMapper', 'dto_sql', dto);
    const domain = {
        client_id: dto.id,
        client_secret: dto.password,
        username: dto.name,
        document: dto.document
    }
    logEnd('ClientMapper', 'dto_sql', domain);
    return domain;
}

export const ClientMapper = {
    sql_dto,
    dto_sql
}