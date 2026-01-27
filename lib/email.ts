import nodemailer from "nodemailer";

// Bozza configurazione email
// Sostituiremo questi valori con le variabili d'ambiente reali in seguito
export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.example.com",
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: process.env.SMTP_SECURE === "true", // true per 465, false per altre porte
  auth: {
    user: process.env.SMTP_USER || "user@example.com",
    pass: process.env.SMTP_PASSWORD || "password",
  },
});

export const mailOptions = {
  from: process.env.SMTP_FROM_EMAIL || "mittente@example.com",
  to: process.env.SMTP_TO_EMAIL || "destinatario@dmg.it",
};
