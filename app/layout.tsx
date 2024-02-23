import { authOptions } from "./api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { Inter } from "next/font/google";
import SessionProvider from "./SessionProvider";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
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
