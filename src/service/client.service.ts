import bcrypt from 'bcrypt';
import { PropCreateclientDTO, PropCreateclientSQL } from "../definition/cliente.definitions";
import { ClientRepository } from "../repository/client.repository";
import { ClientValidator } from "../validator/client.validator";


async function create(body: PropCreateclientDTO) {
    ClientValidator.validateRequest(body);

    const bodySQL = {
        client_secret: await bcrypt.hash(body.password, 10),
        name: body.name,
        document: body.document,
    } as PropCreateclientSQL

    await ClientRepository.create(bodySQL);
}

export const ClientService = {
    create
}
