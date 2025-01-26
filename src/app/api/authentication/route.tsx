import { db } from "@vercel/postgres";
import { NextRequest } from "next/server";
// import jwt from 'jsonwebtoken';

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

    if (body === null || !body.username || !body.password) {
      return Response.json({ error: 'Invalid request body' }, { status: 400 });
    }

    const name = "Jackson Machado Rosa";
    const role = ["ADM"];
    const time = new Date().toISOString();
    const expire = 5 * (60 * 1000);

    // const token = jwt.sign(
    //   {
    //     username: body.username,
    //     name,
    //     role,
    //     time,
    //     expire,
    //   },
    //   process.env.NEXT_PUBLIC_JWT_SECRET as string,
    //   { algorithm: "HS256" }
    // );

    const token = "meu novo token"

    const data = { token: `Bearer ${token}` };
    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
