import { RequestPayment } from "@/src/definition/payment.definition";
import { OpenFinance } from "@/src/definition/utils.definition";
import { authorizeOpenFinance } from "@/src/service/authentication.service";
import { createPayment } from "@/src/service/payment.service";
import { ApiError } from "next/dist/server/api-utils";

export async function POST(request: Request) {
  try {
    const token = request.headers.get('Authorization');
    const x_fapi_interaction_id = request.headers.get('x-fapi-interaction-id');
    const x_idempotency_key = request.headers.get('x-idempotency-key');
    const body = await request.json() as OpenFinance<RequestPayment[]>;

    if (!token) {
      return Response.json({ error: 'Authorization is required' }, { status: 401 });
    }
    if (!x_fapi_interaction_id) {
      return Response.json({ error: 'x-fapi-interaction-id is required' }, { status: 400 });
    }
    if (!x_idempotency_key) {
      return Response.json({ error: 'x-idempotency-key is required' }, { status: 400 });
    }
    const tokenBody = await authorizeOpenFinance(token);
    if (!tokenBody.client_info.account_id) {
      return Response.json({ error: 'Permission Denied' }, { status: 403 });
    }

    const requestPayment = body.data[0] as RequestPayment;

    const payment = await createPayment(requestPayment, tokenBody.client_info.account_id);
    const response = Response.json({
      data: [payment],
      links: {},
      meta: {
        totalRecords: 1,
        totalPages: 1,
        requestDateTime: new Date().toISOString(),
      }
    }, { status: 201 });

    return response;
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      return Response.json({ error: error.message }, { status: error.statusCode });
    }
    return Response.json({ error: 'Internal Error' }, { status: 500 });
  }
}