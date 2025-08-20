import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/public/shared/theme-provider";

export const metadata: Metadata = {
  title: "Cinetorrento",
  description: "Cinetorrento",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="main">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
