"use client";

import { useSession } from "next-auth/react";
import Navbar from "../Navbar";

const Dashboard = () => {
  const session = useSession();

  return (
    <div>
      <div className="border-b">
        <Navbar />
      </div>
      <div className="">
        <div className="mx-auto max-w-6xl">
          <div>{session?.data?.user?.name}</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
