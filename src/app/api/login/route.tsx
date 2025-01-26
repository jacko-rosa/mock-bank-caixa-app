import { NextRequest } from "next/server";
import { db } from "@vercel/postgres";

interface PostRequestBody {
    username: string;
    password: string;
  }


const client = await db.connect();

async function listInvoices() {
  const data = { status: 200, token: "myToken" };
  return data;
}

async function listAccounts() {
  const data = await client.sql`
    SELECT *
    FROM account
    LIMIT 10
  `;

  return data.rows;
}

export async function GET() {
  try {
    return Response.json(await listAccounts());
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
