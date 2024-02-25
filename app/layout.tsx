import { Toaster } from "react-hot-toast";
import { getServerSession } from "next-auth";
import { Inter } from "next/font/google";

import { authOptions } from "./api/auth/[...nextauth]/route";
import SessionProvider from "./helpers/SessionProvider";
import Navbar from "./components/Navbar";
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
