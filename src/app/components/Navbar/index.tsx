"use client";

import { signOut } from "next-auth/react";

const Navbar = () => {
  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
      <div className="relative flex items-center justify-between h-14">
        <div className="flex-1 flex items-center">
          <div className="text-md flex items-center gap-1 font-bold cursor-pointer">
            ⚡ Next-Auth-Firebase
          </div>
        </div>
        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
          <div className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
            <div className="ml-4 flex flex-row text-center items-center justify-center gap-6">
              <span
                onClick={() =>
                  window.open(
                    "https://github.com/paanSinghCoder/next-auth-firebase",
                    "_blank"
                  )
                }
                className="opacity-70 hover:opacity-100 cursor-pointer flex gap-1 items-center justify-center"
              >
                <img
                  src="/GitHub-compact.svg"
                  alt="google"
                  className="h-5 w-5"
                />{" "}
                Github
              </span>
              <span
                onClick={() => signOut()}
                className="opacity-70 hover:opacity-100 cursor-pointer flex gap-1 items-center justify-center"
              >
                Logout
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
