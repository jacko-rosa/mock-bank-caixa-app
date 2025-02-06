import { LoginRequest, SiginupRequest } from "@/src/definition/authentication.definition";
import { ResponseStatus } from "@/src/definition/utils.definition";
import { AuthenticationService } from "@/src/service/authentication.service";
import { logEnd, logInit } from "@/src/service/util.service";
import { NextRequest } from "next/server";

const ROUTE = 'AuthenticationRoute';

async function _signup(request: NextRequest) {
  const body: SiginupRequest = await request.json();
  logInit(ROUTE, 'signup', body);

  return AuthenticationService.signup(body).then(response => {
    const json = Response.json(response.response, response.status);
    logEnd(ROUTE, 'signup', json);
    return json;
  }).catch((error: Error) => {
    logEnd(ROUTE, 'signup', error);
    return Response.json({ error: error.message }, ResponseStatus.BAD_REQUEST);
  });
}

async function _login(request: NextRequest) {
  const body: LoginRequest = await request.json();
  logInit(ROUTE, 'login', body);

  return AuthenticationService.login(body).then(response => {
    const json = Response.json(response.response, response.status);
    logEnd(ROUTE, 'login', json);
    return json;
  }).catch((error: Error) => {
    logEnd(ROUTE, 'login', error);
    return Response.json({ error: error.message }, ResponseStatus.BAD_REQUEST);
  });
}


export async function POST(request: NextRequest) {
  return _signup(request)
}

export async function PUT(request: NextRequest) {
  return _login(request)
}
