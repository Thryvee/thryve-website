import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const scriptUrl = process.env.GOOGLE_SCRIPT_URL;
  if (!scriptUrl) {
    return NextResponse.json({ error: 'Google Script URL not configured' }, { status: 500 });
  }

  const body = await req.json();

  const res = await fetch(scriptUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sheet: 'playbook', ...body }),
  });

  const text = await res.text();
  try {
    const data = JSON.parse(text);
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ success: true });
  }
}
