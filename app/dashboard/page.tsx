"use client";

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Suspense, useEffect } from "react";
import toast from "react-hot-toast";

const Dashboard = () => {
  const session: any = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.error === "RefreshAccessTokenError") {
      signOut();
      toast("Refresh token expired. Please login.");
      router.replace("/login");
    }
  }, [session]);

  if (session?.status === "loading") {
    return (
      <div className="text-md mt-8 w-full h-full flex items-center justify-center">
        Loading...
      </div>
    );
  }

  console.log("Session: ", session);

  return (
    <Suspense fallback="Loading...">
      <div className="text-center pt-12 mx-auto max-w-6xl">
        <div className=" mx-auto max-w-sm py-8 border rounded-md flex flex-col gap-2">
          <h1 className="font-semibold">Dashboard. This is a protected page</h1>
          {session?.data?.user?.name && (
            <div className="text-sm">Name: {session?.data?.user?.name}</div>
          )}
          <div className="text-sm">Email: {session?.data?.user?.email}</div>
        </div>
      </div>
    </Suspense>
  );
};

export default Dashboard;
