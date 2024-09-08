import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import Navbar from "./components/navbar/Navbar";
import "primereact/resources/themes/lara-dark-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import ClientSessionProvider from "./components/ClientSessionProvider"; // Import the client-side provider
import { GoogleAnalytics } from '@next/third-parties/google'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pcaisso",
  description: "AI Art+Code Generator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;700&family=Poppins&family=Roboto:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <script src="https://kit.fontawesome.com/829cabfe65.js" async></script>
      </head>
      <body className={inter.className}>
        <ClientSessionProvider> {/* Use the client-side session provider */}
          <Navbar />
          <div className="contents">{children}</div>
        </ClientSessionProvider>
      </body>
      <GoogleAnalytics gaId="G-8J216NX51C" />
    </html>
  );
}
