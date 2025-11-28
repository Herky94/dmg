import type { Metadata } from "next";
import { Lexend_Deca } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/ui/CustomCursor";

const lexendDeca = Lexend_Deca({
  variable: "--font-lexend-deca",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "DMG",
  description: "Casa farmaceutica",
  icons: {
    icon: "/images/logos/Favicon.svg",
    shortcut: "/images/logos/Favicon.svg",
    apple: "/images/logos/Favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={`${lexendDeca.variable} antialiased overflow-x-hidden`}
        suppressHydrationWarning={true}
      >
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
