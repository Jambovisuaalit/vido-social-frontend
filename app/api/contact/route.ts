import { NextResponse } from "next/server";

function clean(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const name = clean(body.name, 100);
    const email = clean(body.email, 180);
    const company = clean(body.company, 120);
    const phone = clean(body.phone, 40);
    const message = clean(body.message, 3000);
    const subject = clean(body.subject, 160) || "Yhteydenotto verkkosivulta";
    const website = clean(body.website, 100);
    const startedAt = Number(body.startedAt || 0);

    if (website) return NextResponse.json({ message: "Viestin lähetys epäonnistui." }, { status: 400 });
    if (!name || !email || !message || !email.includes("@")) return NextResponse.json({ message: "Täytä nimi, sähköposti ja viesti." }, { status: 400 });
    if (Date.now() - startedAt < 1000) return NextResponse.json({ message: "Lomake lähetettiin liian nopeasti." }, { status: 429 });

    const apiKey = process.env.RESEND_API_KEY;
    const from = process.env.CONTACT_FROM_EMAIL;
    const to = process.env.CONTACT_TO_EMAIL || "jari.koskela@jkpgroup.fi";
    if (!apiKey || !from) return NextResponse.json({ message: "Viestipalvelua ei ole vielä otettu käyttöön. Lähetä viesti suoraan sähköpostilla." }, { status: 503 });

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `${subject}: ${name}`,
        text: `Nimi: ${name}\nYritys: ${company || "-"}\nSähköposti: ${email}\nPuhelin: ${phone || "-"}\n\n${message}`,
      }),
    });

    if (!response.ok) return NextResponse.json({ message: "Viestin lähetys epäonnistui. Yritä myöhemmin uudelleen." }, { status: 502 });
    return NextResponse.json({ message: "Viesti lähetetty." });
  } catch {
    return NextResponse.json({ message: "Virheellinen lomakepyyntö." }, { status: 400 });
  }
}
