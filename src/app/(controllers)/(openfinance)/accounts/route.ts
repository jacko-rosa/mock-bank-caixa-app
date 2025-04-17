import { getAccoutDtoByDocument } from "@/src/service/account.service";
import { authorizeOpenFinance } from "@/src/service/authentication.service";
import { ApiError } from "next/dist/server/api-utils";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get('Authorization');
    const client = await authorizeOpenFinance(token);
    const accounts = await getAccoutDtoByDocument(client.document);
    const response = Response.json({
      data: accounts,
      links: {},
      meta: {
        totalRecords: accounts.length,
        totalPages: 1,
        requestDateTime: new Date().toISOString(),
      }
    });
    return response;
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      return Response.json({ error: error.message }, { status: error.statusCode });
    }
    return Response.json({ error: 'Internal Error' }, { status: 500 });
  }
}
