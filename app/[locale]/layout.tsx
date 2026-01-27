import type { Metadata } from "next";
import { Locale, getTranslations } from "@/lib/translations";
import localFont from "next/font/local";
import "../globals.css";
import CustomCursor from "@/components/ui/CustomCursor";
import AccessibilityToolbar from "@/components/accessibility/AccessibilityToolbar";
import SkipToContent from "@/components/accessibility/SkipToContent";

const googleSans = localFont({
  src: "../fonts/GoogleSansFlex.ttf",
  variable: "--font-google-sans",
  display: "swap",
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = getTranslations(locale);

  return {
    title: {
      template: t.metadata.titleTemplate,
      default: t.metadata.home.title,
    },
    description: t.metadata.home.description,
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon.ico",
      apple: "/favicon.ico",
    },
  };
}

export async function generateStaticParams() {
  return [{ locale: "it" }, { locale: "en" }];
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  return (
    <html lang={locale} suppressHydrationWarning={true}>
      <body
        className={`${googleSans.variable} font-sans antialiased overflow-x-clip`}
        suppressHydrationWarning={true}
      >
        <SkipToContent />
        <AccessibilityToolbar />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
