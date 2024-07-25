"use client";

import React, { useEffect, useState } from "react";
import { FaLink } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import Link from "next/link";

const Header = ({ active }: { active: string }) => {
  return (
    <div className="p-5 flex justify-between items-center">
      <div>
        <img src="/images/logo.png" alt="devlink logo" className="w-36" />
      </div>
      <div className="flex">
        <Link href={"/main/links"}>
          {" "}
          <div
            className={`cursor-pointer p-3 px-5 flex items-center gap-2 ${
              active === "links" ? "bg-[#EFEBFF]" : "bg-none"
            } rounded-md`}
          >
            <FaLink color={`${active === "links" ? "#633CFF" : "#737373"}`} />
            <p
              className={`font-semibold ${
                active === "links" ? "text-main" : "text-[#737373]"
              } `}
            >
              Links
            </p>
          </div>
        </Link>
        <Link href={"/main/profile"}>
          <div
            className={`cursor-pointer p-3 px-5 flex items-center gap-2 ${
              active === "profile" ? "bg-[#EFEBFF]" : "bg-none"
            } rounded-md`}
          >
            <CgProfile
              color={`${active === "profile" ? "#633CFF" : "#737373"}`}
            />
            <p
              className={`font-semibold ${
                active === "profile" ? "text-main" : "text-[#737373]"
              } `}
            >
              Profile Details
            </p>
          </div>
        </Link>
      </div>
      <div>
       <Link href={"/main/preview"}>
       <button className="border-[1px] border-main p-2 px-5 rounded-md font-semibold text-main ">
          Preview
        </button>
       </Link>
      </div>
    </div>
  );
};

export default Header;
