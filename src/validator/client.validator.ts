import { isRequired, shouldHasLessThen, shouldHasMorThen, validateCPF_CNPJ } from "@/src/validator/util.validator";
import { PropCreateclientDTO } from "../definition/cliente.definitions";

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

function validateRequest(body: PropCreateclientDTO) {
    isRequired("reques", body);
    password(body.password);
    name(body.name)
    validateCPF_CNPJ(body.document);
}


export const ClientValidator = {
    validateRequest
}