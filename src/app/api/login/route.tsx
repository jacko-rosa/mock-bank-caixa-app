import { NextRequest } from "next/server";

interface PostRequestBody {
    username: string;
    password: string;
  }


async function listInvoices() {
  const data = { status: 200, token: "myToken" };
  return data;
}

export async function GET() {
  try {
    return Response.json(await listInvoices());
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const headers = request.headers;
    const body: PostRequestBody = await request.json();
    if (headers === null || !headers.get('Authorization')) {
      return Response.json({ error: 'Invalid request headers' }, { status: 400 });
    }

    if (body === null || !body.username || !body.password) {
      return Response.json({ error: 'Invalid request body' }, { status: 400 });
    }

    const data = await listInvoices();
    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
