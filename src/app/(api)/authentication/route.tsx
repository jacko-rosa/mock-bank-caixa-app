import { LoginRequest, SiginupRequest } from "@/src/definition/authentication.definition";
import { ResponseStatus } from "@/src/definition/utils.definition";
import { AuthenticationService } from "@/src/service/authentication.service";
import { logEnd, logInit } from "@/src/service/util.service";
import { NextRequest } from "next/server";

const ROUTE = 'AuthenticationRoute';

async function _signup(request: NextRequest) {
  const body: SiginupRequest = await request.json();
  logInit(ROUTE, 'signup', body);

  return await AuthenticationService.signup(body).then(response => {
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

  return await AuthenticationService.login(body).then(response => {
    const json = Response.json(response.response, response.status);
    logEnd(ROUTE, 'login', json);
    return json;
  }).catch((error: Error) => {
    logEnd(ROUTE, 'login', error);
    return Response.json({ error: error.message }, ResponseStatus.BAD_REQUEST);
  });
}

async function _authorize(request: NextRequest) {
  const token = request.headers.get('Authorization');
  logInit(ROUTE, 'authorize', "has token: " + !!token);

  if (token && token.startsWith("Bearer ")) {
    const tokenWithoutBearer = token.slice(7); // Remove "Bearer " do token
    return await AuthenticationService.authorize(tokenWithoutBearer).then(response => {
      const json = Response.json(response.response, response.status);
      logEnd(ROUTE, 'authorize', json);
      return json;
    }).catch((error: Error) => {
      logEnd(ROUTE, 'authorize', error);
      return Response.json({ error: error.message }, ResponseStatus.BAD_REQUEST);
    });
  } else {
    return Response.json({ error: 'Invalid token format' }, ResponseStatus.BAD_REQUEST);
  }
}

export async function POST(request: NextRequest) {
  return _signup(request)
}

export async function PUT(request: NextRequest) {
  return _login(request)
}

export async function GET(request: NextRequest) {
  return _authorize(request)
}
