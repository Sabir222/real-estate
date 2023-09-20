import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "./components/navbar/Navbar";
import RegisterModal from "./components/modal/RegisterModal";
import ToastProvider from "./providers/ToastProvider";
import LoginModal from "./components/modal/LoginModal";
import getCurrentUser from "./actions/getCurrentUser";
import RentModal from "./components/modal/RentModal";
import { Providers } from "./Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Estate",
  description: "Website to browse and rent houses",
  icons: {
    icon: "/images/logo.png",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en" className="light">
      <body className={inter.className}>
        <Providers>
          <ToastProvider />
          <Navbar currentUser={currentUser} />
          <RegisterModal />
          <LoginModal />
          <RentModal />
          {children}
        </Providers>
      </body>
    </html>
  );
}
