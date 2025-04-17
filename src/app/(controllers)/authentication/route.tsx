import { LoginRequest, SiginupRequest } from "@/src/definition/authentication.definition";
import { ResponseStatus } from "@/src/definition/utils.definition";
import { authorize, login, signup } from "@/src/service/authentication.service";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const body: SiginupRequest = await request.json();
  return await signup(body).then(response => {
    const json = Response.json(response.response, response.status);
    return json;
  }).catch((error: Error) => {
    return Response.json({ error: error.message }, ResponseStatus.BAD_REQUEST);
  });
}

export async function PUT(request: NextRequest) {
  const body: LoginRequest = await request.json();
  return await login(body).then(response => {
    const json = Response.json(response.response, response.status);
    return json;
  }).catch((error: Error) => {
    return Response.json({ error: error.message }, ResponseStatus.BAD_REQUEST);
  });
}

export async function GET(request: NextRequest) {
  const token = request.headers.get('Authorization');
  if (token && token.startsWith("Bearer ")) {
    return await authorize(token).then(response => {
      const json = Response.json(response.response, response.status);
      return json;
    }).catch((error: Error) => {
      return Response.json({ error: error.message }, ResponseStatus.BAD_REQUEST);
    });
  } else {
    return Response.json({ error: 'Invalid token format' }, ResponseStatus.BAD_REQUEST);
  }
}
