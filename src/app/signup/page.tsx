import Link from "next/link";
import React from "react";
import { FaEnvelope } from "react-icons/fa";
import { IoIosLock } from "react-icons/io";

const page = () => {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <div className="w-[40%]">
        <div className="flex justify-center">
          <img src="/images/logo.png" alt="Devlink logo" />
        </div>
        <div className="mt-10 w-full">
          <h1 className="font-bold text-3xl text-[#333333]">Create account</h1>
          <p className="text-[#737373]">
            Let's get you started sharing your links
          </p>
          <form className="mt-5 flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="text-xs">
                Email address
              </label>
              <div className="flex items-center gap-2 border-[1px] p-3 rounded-md">
                <FaEnvelope className="w-[5%]"/>
                <input
                  type="text"
                  className="outline-none rounded-md w-[95%]"
                  placeholder="e.g. alex@gmail.com"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="text-xs">
                Password
              </label>
              <div className="flex items-center gap-2 border-[1px] p-3 rounded-md">
                <IoIosLock className="w-[5%]"/>
                <input
                  type="password"
                  className="outline-none rounded-md w-[95%]"
                  placeholder="At least 8 characters"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="text-xs">
                Confirm password
              </label>
              <div className="flex items-center gap-2 border-[1px] p-3 rounded-md">
                <IoIosLock className="w-[5%]"/>
                <input
                  type="password"
                  className="outline-none rounded-md w-[95%]"
                  placeholder="At least 8 characters"
                />
              </div>
              <p className="text-[#737373] text-xs">Password must contain at least 8 characters</p>
            </div>
            <button className="w-full bg-main text-white p-3 font-semibold rounded-md">Create new account</button>
          </form>
          <p className="text-center text-[#737373] mt-2">Already have an account? <Link href={"/signup"}><span className="text-main">Login</span></Link> </p>
        </div>
      </div>
    </div>
  );
};

export default page;
