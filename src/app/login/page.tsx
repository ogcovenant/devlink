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
        <div className="mt-10">
          <h1 className="font-bold text-3xl text-[#333333]">Login</h1>
          <p className="text-[#737373]">
            Add your details below to get back into the app
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
                  placeholder="Enter your password"
                />
              </div>
            </div>
            <button className="w-full bg-main text-white p-3 font-semibold rounded-md">Login</button>
          </form>
          <p className="text-center text-[#737373] mt-2">Don't have an account? <Link href={"/signup"}><span className="text-main">Create account</span></Link> </p>
        </div>
      </div>
    </div>
  );
};

export default page;
