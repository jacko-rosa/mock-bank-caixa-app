import { httpStatus, response } from "../definition/utils.definition";

function responseError(message: string, status: httpStatus): response {
    return { response: { message: message }, status: status };
}

function responseSucess(data: object, status: httpStatus): response {
    return { response: data, status: status };
}

export const ResponseMapper = {
    responseError,
    responseSucess
}