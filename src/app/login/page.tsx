"use client";

import Link from "next/link";
import React, { useState } from "react";
import { FaEnvelope } from "react-icons/fa";
import { IoIosLock } from "react-icons/io";
import * as Yup from "yup";
import { useFormik } from "formik";

const page = () => {
  const [focused, setFocused] = useState("");

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .trim("email cannot contain whitespaces")
        .email("Invalid email address provided")
        .required("Required"),
      password: Yup.string()
        .trim("Password cannot contain whitespaces")
        .min(8, "Password should contain atleast 8 characters")
        .required("Required"),
    }),
    onSubmit: () => {
      console.log("submitted");
    },
  });

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
          <form className="mt-5 flex flex-col gap-5" onSubmit={formik.handleSubmit}>
            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="text-xs">
                Email address
              </label>
              <div
                className={`flex items-center gap-2 border-[1px] ${
                  focused === "email"
                    ? "border-main shadow-xl shadow-main/50 border-2"
                    : ""
                } p-3 rounded-md`}
              >
                <FaEnvelope className="w-[5%]" />
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="outline-none rounded-md w-[95%]"
                  placeholder="e.g. alex@gmail.com"
                  onFocus={() => {
                    setFocused("email");
                  }}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
              </div>
              {formik.errors.email || formik.touched.email ? (
                <p className="text-xs text-red-600">{formik.errors.email}</p>
              ) : (
                ""
              )}
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="text-xs">
                Password
              </label>
              <div
                className={`flex items-center gap-2 border-[1px] ${
                  focused === "password"
                    ? "border-main shadow-xl shadow-main/50 border-2"
                    : ""
                } p-3 rounded-md`}
              >
                <IoIosLock className="w-[5%]" />
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="outline-none rounded-md w-[95%]"
                  placeholder="At least 8 characters"
                  onFocus={() => {
                    setFocused("password");
                  }}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
              </div>
              {formik.errors.password || formik.touched.password ? (
                <p className="text-xs text-red-600">{formik.errors.password}</p>
              ) : (
                ""
              )}
            </div>
            <button className="w-full bg-main text-white p-3 font-semibold rounded-md">
              Login
            </button>
          </form>
          <p className="text-center text-[#737373] mt-2">
            Don't have an account?{" "}
            <Link href={"/signup"}>
              <span className="text-main">Create account</span>
            </Link>{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default page;
