import { HttpStatus, Response } from "../definition/utils.definition";

function responseError(message: string, status: HttpStatus): Response {
    return { response: { message: message }, status: status };
}

function responseSucess(data: object, status: HttpStatus): Response {
    return { response: data, status: status };
}

export const ResponseMapper = {
    responseError,
    responseSucess
}