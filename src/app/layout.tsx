import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/website/shared/theme-provider";
import { Toaster } from "@/components/ui/sonner";

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
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <main className="main">{children}</main>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
