import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "D.M.G. Italia | Drugs Minerals and Generics",
  description: "Casa farmaceutica",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
