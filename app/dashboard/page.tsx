"use client";

import { useSession } from "next-auth/react";
import { Suspense } from "react";

const Dashboard = () => {
  const session = useSession();

  if (session?.status === "loading") {
    return <h1>Loading...</h1>;
  }

  return (
    <Suspense fallback="Loading...">
      <div className="">
        <div className="mx-auto max-w-6xl">
          <h1>This is a protected page</h1>
          <div>Logged in as: {session?.data?.user?.name}</div>
          <div>Email: {session?.data?.user?.email}</div>
        </div>
      </div>
    </Suspense>
  );
};

export default Dashboard;
