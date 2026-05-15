import { NextRequest, NextResponse } from "next/server";

const CLIENT_ID     = Number(process.env.RAV_MASAR_CLIENT_ID);
const CLIENT_SECRET = process.env.RAV_MASAR_CLIENT_SECRET!;
const USER_TOKEN    = process.env.RAV_MASAR_USER_TOKEN!;
const LIST_ID       = Number(process.env.RAV_MASAR_LIST_ID ?? 100152);
const BASE_URL      = "https://graph.responder.live/v2";

async function getAccessToken(): Promise<string> {
  const res = await fetch(`${BASE_URL}/oauth/token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      grant_type: "client_credentials",
      scope: "*",
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      user_token: USER_TOKEN,
    }),
  });
  const data = await res.json();
  if (!data.access_token) {
    throw new Error(`Token error: ${JSON.stringify(data)}`);
  }
  return data.access_token;
}

export async function POST(req: NextRequest) {
  const { email, name } = await req.json();

  if (!email) {
    return NextResponse.json({ error: "Missing email" }, { status: 400 });
  }

  try {
    const token = await getAccessToken();

    const res = await fetch(`${BASE_URL}/subscribers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        email,
        list_ids: [LIST_ID],
        first: name ?? "",
      }),
    });

    const text = await res.text();
    console.log("Responder status:", res.status, "body:", text);

    return NextResponse.json({ ok: true, status: res.status, body: text });
  } catch (err) {
    console.error("Responder error:", err);
    return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
  }
}
