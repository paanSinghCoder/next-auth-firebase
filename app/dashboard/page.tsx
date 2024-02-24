"use client";

import { useSession } from "next-auth/react";
import { Suspense } from "react";

const Dashboard = () => {
  const session = useSession();

  if (session?.status === "loading") {
    return (
      <div className="text-md mt-8 w-full h-full flex items-center justify-center">
        Loading...
      </div>
    );
  }

  console.log("session dashboard: ", session);

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
