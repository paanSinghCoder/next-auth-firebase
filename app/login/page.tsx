"use client";

import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const Login = () => {
  const session = useSession();

  if (session?.status === "loading") {
    return <h1>Loading...</h1>;
  }

  if (session?.status === "authenticated") {
    redirect("/dashboard");
  }

  return (
    <main className="h-screen w-full flex items-center justify-center">
      <div className="px-3 py-4 border rounded-md">
        <h1 className="font-semibold text-sm text-center">Login</h1>
        <button
          onClick={() =>
            signIn("google", {
              redirect: true,
              callbackUrl: "/dashboard",
            })
          }
          className="text-sm border rounded-md hover:shadow px-4 py-2 mt-4 flex items-center justify-center gap-2 w-full"
        >
          <img src="/google-compact.svg" alt="google" className="h-5 w-5" />
          <span className="text-xs">Continue with Google</span>
        </button>
        <div className="text-xs text-center py-4 opacity-70">OR</div>

        <form onSubmit={() => null} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Enter Email"
            className="border rounded-md text-sm px-3 py-2"
          />
          <input
            type="password"
            placeholder="Enter Password"
            className="border rounded-md text-sm px-3 py-2"
          />
          <button
            className="text-sm bg-cyan-700 rounded-md text-white py-2 hover:bg-cyan-800"
            type="submit"
          >
            Register
          </button>
          <button className="text-xs opacity-70">Go to Login</button>
        </form>
      </div>
    </main>
  );
};

export default Login;
