import { LoginRequest, SiginupRequest } from "@/src/definition/authentication.definition";
import { ClientDTO } from "@/src/definition/cliente.definition";
import { ResponseStatus } from "@/src/definition/utils.definition";
import { AuthenticationService } from "@/src/service/authentication.service";
import { logEnd, logInit } from "@/src/service/util.service";
import { NextRequest } from "next/server";

const ROUTE = 'OpenFinance-Accounts';

/**
 * método para listar as contas de um usuário 
 * o usuário deve ser obtido do concentimento 
 * o concetimento é obtido e validado junto ao Banco Central que para fins didáticos será desconsiderado
 * o ocncentimento fornecido pelo Banco Central possui um client_id que é utilizado para especificar o usuário
 * para fins didáticos esse client_id será obtido diretamente token JWT e receberá o nome de "document" cujo valor será o cpf/cnpj do usuário
 * @param request parametros de filtros e paginação serão desconsiderados
 * @returns lista de contas do usuário
 */
 
async function _getAccounts(request: NextRequest) {
  const token = request.headers.get('Authorization');
  logInit(ROUTE, '_getAccounts', "has token: " + !!token);
    return await AuthenticationService.authorizeOpenFinance(token).then((client: ClientDTO) => {
      

      // todo: implementar a busca de contas do usuário
      
      const json = Response.json("foi", {status: 200});
      logEnd(ROUTE, 'authorize', json);
      return json;
    }).catch((error: Error) => {
      logEnd(ROUTE, 'authorize', error);
      return Response.json({ error: error.message }, ResponseStatus.BAD_REQUEST);
    });
}



export async function GET(request: NextRequest) {
  return _getAccounts(request)
}
