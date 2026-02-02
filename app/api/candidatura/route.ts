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
    const tipoCandidatura = formData.get("tipoCandidatura") as string;
    const messaggio = formData.get("message") as string;
    const cv = formData.get("cv") as File | null;
    const locale = formData.get("locale") as string; // IT o EN

    if (!nome || !cognome || !email || !cellulare || !posizione || !cv) {
      return NextResponse.json(
        { error: "Tutti i campi obbligatori devono essere compilati" },
        { status: 400 },
      );
    }

    // Convert file to buffer for attachment
    const bytes = await cv.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Lingua del form
    const languageLabel = locale === "en" ? "🇬🇧 English" : "🇮🇹 Italiano";
    const tipoCandidaturaLabel =
      tipoCandidatura === "spontanea"
        ? locale === "en"
          ? "Spontaneous Application"
          : "Autocandidatura"
        : locale === "en"
          ? "Specific Position"
          : "Posizione Specifica";

    await transporter.sendMail({
      ...mailOptions,
      to: process.env.SMTP_HR_EMAIL || mailOptions.to,
      subject: `[Candidatura] ${nome} ${cognome} - ${posizione} [${languageLabel}]`,
      text: `
NUOVA CANDIDATURA
=================
Lingua del form: ${languageLabel}
Tipo candidatura: ${tipoCandidaturaLabel}

DATI DEL CANDIDATO
------------------
Nome: ${nome}
Cognome: ${cognome}
Email: ${email}
Cellulare: ${cellulare}
Posizione desiderata: ${posizione}

LETTERA DI PRESENTAZIONE
------------------------
${messaggio || "Nessun messaggio inserito"}

---
CV allegato: ${cv.name}
      `,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: ${locale === "en" ? "#1e3a5f" : "#C34069"}; color: white; padding: 20px; text-align: center;">
            <h2 style="margin: 0;">Nuova Candidatura</h2>
            <p style="margin: 5px 0 0 0; font-size: 14px;">${languageLabel} | ${tipoCandidaturaLabel}</p>
          </div>
          
          <div style="padding: 20px;">
            <h3 style="color: #C34069; border-bottom: 2px solid #C34069; padding-bottom: 10px;">Dati del Candidato</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0;"><strong>Nome:</strong></td>
                <td style="padding: 8px 0;">${nome} ${cognome}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0;"><strong>Email:</strong></td>
                <td style="padding: 8px 0;"><a href="mailto:${email}">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0;"><strong>Cellulare:</strong></td>
                <td style="padding: 8px 0;">${cellulare}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0;"><strong>Posizione:</strong></td>
                <td style="padding: 8px 0;"><strong>${posizione}</strong></td>
              </tr>
            </table>
          </div>

          ${
            messaggio
              ? `
          <div style="padding: 20px; background-color: #f5f5f5;">
            <h3 style="color: #C34069; border-bottom: 2px solid #C34069; padding-bottom: 10px;">Lettera di Presentazione</h3>
            <p style="white-space: pre-line;">${messaggio.replace(/\n/g, "<br>")}</p>
          </div>
          `
              : ""
          }

          <div style="padding: 15px; background-color: #e3f2fd; border-left: 4px solid #2196f3; margin: 20px;">
            <p style="margin: 0; font-size: 12px;">📎 CV allegato: ${cv.name}</p>
          </div>
        </div>
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
