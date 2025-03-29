import type { Metadata } from "next";
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import "./globals.css";
import Footer from "@/components/footer";
import Navbar from "@/components/Navbar";



export const metadata: Metadata = {
  title: "CRUD Local",
  description: " Developed by TAKUNG",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  const messages = await getMessages();
  return (
    <html lang={locale}>
      <body suppressHydrationWarning>
        <NextIntlClientProvider messages={messages}>
          <div className="flex flex-col min-h-screen noto-serif-thai">
            <main className="flex-grow">
            <Navbar />
              {children}
            </main>
            <Footer />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
