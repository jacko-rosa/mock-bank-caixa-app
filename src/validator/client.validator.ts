import { isRequired, shouldHasLessThen, shouldHasMorThen, validateCPF_CNPJ } from "./util.validator";
import { ClientDTO } from "../definition/cliente.definition";

function password(password: string) {
    isRequired("password", password);
    shouldHasMorThen("password", password, 6);
    shouldHasLessThen("password", password, 12);
}

function name(name: string) {
    isRequired("name", name);
    shouldHasMorThen("name", name, 5);
    shouldHasLessThen("name", name, 200);
}

function validateId(id: string) {
    isRequired("id", id);
}

function validateCreateRequest(body: ClientDTO) {
    isRequired("request", body);
    password(body.password);
    name(body.name)
    validateCPF_CNPJ(body.document);
}


export const ClientValidator = {
    validateCreateRequest,
    validateId
}