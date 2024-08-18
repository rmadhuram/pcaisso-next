import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar/Navbar";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import ClientSessionProvider from "./components/ClientSessionProvider"; // Import the client-side provider

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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Chivo+Mono&family=Poppins&family=Roboto:wght@400;700&family=Rubik+Pixels&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={inter.className}>
        <ClientSessionProvider> {/* Use the client-side session provider */}
          <Navbar />
          <div className="contents">{children}</div>
        </ClientSessionProvider>
      </body>
    </html>
  );
}
