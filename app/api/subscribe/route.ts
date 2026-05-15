import { NextRequest, NextResponse } from "next/server";

const RAV_MASAR_TOKEN = process.env.RAV_MASAR_TOKEN!;
const RAV_MASAR_LIST_ID = Number(process.env.RAV_MASAR_LIST_ID ?? 100152);

export async function POST(req: NextRequest) {
  const { email, name } = await req.json();

  if (!email) {
    return NextResponse.json({ error: "Missing email" }, { status: 400 });
  }

  try {
    await fetch("https://ravmesser-new-api.ravpages.co.il/api", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: RAV_MASAR_TOKEN,
        list_id: RAV_MASAR_LIST_ID,
        email,
        first_name: name ?? "",
      }),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Rav Masar error:", err);
    return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
  }
}
