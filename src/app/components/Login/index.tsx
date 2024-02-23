"use client";

import { signIn } from "next-auth/react";

const Login = () => {
  return (
    <main className="h-screen w-full flex items-center justify-center">
      <div className="px-3 py-4 border rounded-md">
        <h1 className="font-semibold text-lg">Login</h1>
        <button
          onClick={() => signIn("google")}
          className="text-sm border rounded-lg shadow px-4 py-3 mt-4 flex items-center justify-center gap-2"
        >
          <img src="/google-compact.svg" alt="google" className="h-5 w-5" />
          <span>Continue with Google</span>
        </button>
      </div>
    </main>
  );
};

export default Login;
