"use client";

import { useSession } from "next-auth/react";
import { Suspense } from "react";

const Dashboard = () => {
  const session = useSession();

  if (session?.status === "loading") {
    return <h1>Loading...</h1>;
  }

  return (
    <Suspense fallback="Suspense Loading...">
      <div className="text-center pt-12 mx-auto max-w-6xl">
        <div className=" mx-auto max-w-sm py-8 border rounded-md flex flex-col gap-2">
          <h1 className="font-semibold">This is a protected page</h1>
          <div className="text-sm">Name: {session?.data?.user?.name}</div>
          <div className="text-sm">Email: {session?.data?.user?.email}</div>
        </div>
      </div>
    </Suspense>
  );
};

export default Dashboard;
