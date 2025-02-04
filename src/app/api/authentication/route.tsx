import { LoginRequest } from "@/src/definition/authentication.definition";
import { ResponseStatus } from "@/src/definition/utils.definition";
import { AuthenticationService } from "@/src/service/authentication.service";
import { logEnd, logInit } from "@/src/service/util.service";
import { NextRequest } from "next/server";

async function _login(request: NextRequest) {
  const body: LoginRequest = await request.json();
  logInit('AuthenticationRoute', 'login', body);

  return AuthenticationService.login(body).then(response => {
    const json = Response.json(response, ResponseStatus.OK);
    logEnd('AuthenticationRoute', 'login', json);
    return json;
  }).catch((error: Error) => {
    logEnd('AuthenticationRoute', 'login', error);
    return Response.json({ error: error.message }, ResponseStatus.BAD_REQUEST);
  });
}


export async function POST(request: NextRequest) {
  return _login(request)
}
