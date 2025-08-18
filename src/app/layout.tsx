import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/shared/Header";
import { ThemeProvider } from "@/components/shared/theme-provider";
import DownloadGuide from "@/components/shared/DownloadGuide";
import Footer from "@/components/shared/Footer";

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
          <Header />
          <main className="main">{children}</main>
          <DownloadGuide />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
