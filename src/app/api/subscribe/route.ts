import { NextResponse } from "next/server";
import { isValidEmail, saveLead } from "@/lib/leads";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { email, company, name, brandName, website, niche } = body as {
    email?: unknown;
    company?: unknown;
    name?: unknown;
    brandName?: unknown;
    website?: unknown;
    niche?: unknown;
  };

  // Honeypot: real users never fill this hidden field.
  if (typeof company === "string" && company.trim().length > 0) {
    return NextResponse.json({ ok: true });
  }

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }

  await saveLead({
    source: "newsletter",
    email,
    name: typeof name === "string" ? name.slice(0, 200) : undefined,
    brandName: typeof brandName === "string" ? brandName.slice(0, 200) : undefined,
    website: typeof website === "string" ? website.slice(0, 300) : undefined,
    niche: typeof niche === "string" ? niche.slice(0, 200) : undefined,
    createdAt: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true });
}
