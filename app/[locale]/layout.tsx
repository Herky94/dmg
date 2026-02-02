import type { Metadata } from "next";
import { Locale, getTranslations } from "@/lib/translations";
import localFont from "next/font/local";
import Script from "next/script";
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
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = getTranslations(locale as Locale);

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
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <html lang={locale} suppressHydrationWarning={true}>
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-WG2L98N8S2"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-WG2L98N8S2');
          `}
        </Script>
      </head>
      <body
        className={`${googleSans.variable} font-sans antialiased overflow-x-clip`}
        suppressHydrationWarning={true}
      >
        <SkipToContent />
        <AccessibilityToolbar locale={locale as Locale} />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
