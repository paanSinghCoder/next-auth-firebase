import { signOut } from "next-auth/react";
import Link from "next/link";

const NavAuthButtons = (session: any) => {
  const { status } = session;

  if (status === "loading") return <h1>...</h1>;

  if (status === "unauthenticated")
    return (
      <Link
        className="bg-cyan-700 hover:bg-cyan-800 text-white px-4 py-1 text-sm rounded-md"
        href="/login"
      >
        Login
      </Link>
    );

  if (status === "authenticated")
    return (
      <button
        className="opacity-70 hover:opacity-100"
        onClick={() => signOut()}
      >
        Logout
      </button>
    );
};

export default NavAuthButtons;
