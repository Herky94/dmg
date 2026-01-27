import { NextResponse } from "next/server";
import { transporter, mailOptions } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const nome = formData.get("nome") as string;
    const cognome = formData.get("cognome") as string;
    const email = formData.get("email") as string;
    const cellulare = formData.get("cellulare") as string;
    const posizione = formData.get("posizione") as string;
    const messaggio = formData.get("message") as string;
    const cv = formData.get("cv") as File | null;

    if (!nome || !cognome || !email || !cellulare || !posizione || !cv) {
      return NextResponse.json(
        { error: "Tutti i campi obbligatori devono essere compilati" },
        { status: 400 },
      );
    }

    // Convert file to buffer for attachment
    const bytes = await cv.arrayBuffer();
    const buffer = Buffer.from(bytes);

    await transporter.sendMail({
      ...mailOptions,
      subject: `Nuova Candidatura da ${nome} ${cognome} - ${posizione}`,
      text: `
        Nuova candidatura ricevuta dal sito web.
        
        Dettagli candidato:
        Nome: ${nome}
        Cognome: ${cognome}
        Email: ${email}
        Cellulare: ${cellulare}
        Posizione desiderata: ${posizione}
        
        Lettera di presentazione:
        ${messaggio || "Nessun messaggio inserito"}
      `,
      html: `
        <h3>Nuova candidatura ricevuta</h3>
        <p><strong>Nome:</strong> ${nome}</p>
        <p><strong>Cognome:</strong> ${cognome}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Cellulare:</strong> ${cellulare}</p>
        <p><strong>Posizione:</strong> ${posizione}</p>
        <p><strong>Lettera di presentazione:</strong></p>
        <p>${(messaggio || "").replace(/\n/g, "<br>")}</p>
      `,
      attachments: [
        {
          filename: cv.name,
          content: buffer,
        },
      ],
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Errore durante l'invio della candidatura" },
      { status: 500 },
    );
  }
}
