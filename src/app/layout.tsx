import type { Metadata } from "next";
import "./globals.css";
import Provider from "../../context/Provider";
import { manrope } from "./fonts/fonts";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "Wiki UI",
  description: "Wiki UI - Templates, resources and more...",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={manrope.className}
      >
        <Provider>
          <Navbar />
          {children}
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
