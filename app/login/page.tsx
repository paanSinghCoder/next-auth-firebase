"use client";

import { FormEventHandler, useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import toast from "react-hot-toast";
import { SignInResponse, signIn, useSession } from "next-auth/react";
import { doc, setDoc } from "firebase/firestore";
import { redirect } from "next/navigation";

import { auth, db } from "../helpers/firebase";

const Login = () => {
  const session = useSession();
  const [creds, setCreds] = useState({ name: "", email: "", password: "" });
  const [isRegisterScreen, setRegisterScreen] = useState(true);

  const submit: FormEventHandler<HTMLFormElement> = async () => {
    try {
      if (isRegisterScreen) {
        const res = await createUserWithEmailAndPassword(
          auth,
          creds.email.trim(),
          creds.password
        );

        console.log("RES after signup: ", res);

        await setDoc(doc(db, "users", res.user.uid), {
          name: creds.name.trim() || "Unnamed user",
          email: creds.email.trim(),
          image: "",
          emailVerified: false,
        });

        if (!res?.user) {
          toast.error("Something went wrong");
          return;
        }

        toast.success("Sign up successful. Please login");
      } else {
        const res: SignInResponse | undefined = await signIn("credentials", {
          email: creds.email,
          password: creds.password,
          redirect: false,
          callbackUrl: "/dashboard",
        });

        if (res?.status === 401) {
          toast.error("Invalid email/password");
          return;
        }

        if (res?.status === 500) {
          toast.error("Something went wrong");
          return;
        }

        if (res?.ok) {
          redirect("/dashboard");
        }
      }
    } catch (error: any) {
      toast(error.message);
      console.log(error);
    }
  };

  if (session?.status === "loading") {
    return (
      <div className="text-md mt-8 w-full h-full flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (session?.status === "authenticated") {
    redirect("/dashboard");
  }

  return (
    <main className="h-full pt-20 w-full flex items-center justify-center">
      <div className="px-3 py-4 border rounded-md transform">
        <h1 className="font-semibold text-sm text-center">
          {isRegisterScreen ? "Create a new account" : "Login"}
        </h1>
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

        <form
          onSubmit={(e) => {
            e.preventDefault();
            submit(e);
          }}
          className="flex flex-col gap-4"
        >
          {isRegisterScreen && (
            <input
              value={creds.name}
              onChange={(e) => setCreds({ ...creds, name: e.target.value })}
              type="text"
              required
              placeholder="Enter Name"
              className="border rounded-md text-sm px-3 py-2 focus:outline-none focus:ring-0 focus:ring-offset-0"
            />
          )}
          <input
            value={creds.email}
            onChange={(e) => setCreds({ ...creds, email: e.target.value })}
            type="email"
            required
            placeholder="Enter Email"
            className="border rounded-md text-sm px-3 py-2 focus:outline-none focus:ring-0 focus:ring-offset-0"
          />
          <input
            value={creds.password}
            required
            onChange={(e) => setCreds({ ...creds, password: e.target.value })}
            type="password"
            placeholder="Enter Password"
            className="border rounded-md text-sm px-3 py-2 focus:outline-none focus:ring-0 focus:ring-offset-0"
          />
          <button
            disabled={
              !creds.email.trim() ||
              !creds.password.trim() ||
              (isRegisterScreen && !creds.name.trim())
            }
            className="text-sm bg-cyan-700 rounded-md text-white py-2 hover:bg-cyan-800 disabled:bg-slate-200 disabled:text-gray-400 focus:outline-none focus:ring-0 focus:ring-offset-0"
            type="submit"
          >
            {isRegisterScreen ? "Register" : "Login"}
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              setRegisterScreen((prev) => !prev);
            }}
            className="text-xs opacity-70"
          >
            {isRegisterScreen ? "Go to Login" : "Go to Register"}
          </button>
        </form>
      </div>
    </main>
  );
};

export default Login;
