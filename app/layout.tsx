import { Toaster } from "react-hot-toast";
import { getServerSession } from "next-auth";
import { Inter } from "next/font/google";

import SessionProvider from "./helpers/SessionProvider";
import Navbar from "./components/Navbar";
import { authOptions } from "./helpers/AuthOptions";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
          <Toaster />
          <div className="border-b">
            <Navbar />
          </div>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
