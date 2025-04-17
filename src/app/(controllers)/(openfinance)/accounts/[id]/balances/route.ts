import { authorizeOpenFinance } from "@/src/service/authentication.service";
import { getBalanceDtoByAccountId } from "@/src/service/balance.service";
import { ApiError } from "next/dist/server/api-utils";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const token = request.headers.get('Authorization');
    const x_fapi_interaction_id = request.headers.get('x-fapi-interaction-id');
    const resolvedParams = await Promise.resolve(params);
    const accountId = resolvedParams.id;

    if (!token) {
      return Response.json({ error: 'Authorization is required' }, { status: 401 });
    }
    if (!x_fapi_interaction_id) {
      return Response.json({ error: 'x-fapi-interaction-id is required' }, { status: 400 });
    }
    if (!accountId) {
      return Response.json({ error: 'Account ID is required' }, { status: 400 });
    }

    await authorizeOpenFinance(token);
    const balance = await getBalanceDtoByAccountId(accountId);

    const response = Response.json({
      data: { balance },
      links: {},
      meta: {
        totalRecords: 1,
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
