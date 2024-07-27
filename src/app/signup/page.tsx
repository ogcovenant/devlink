"use client";

import Link from "next/link";
import React, { useState } from "react";
import { FaEnvelope } from "react-icons/fa";
import { IoIosLock } from "react-icons/io";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios, { AxiosError } from "axios";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { AlertCircle } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import toast from "react-hot-toast";

const page = () => {
  const router = useRouter();

  const [focused, setFocused] = useState("");
  const [loading, setLoading] = useState(false);
  const [conflictError, setConflictError] = useState(false);
  const [serverError, setServerError] = useState(false)

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      cpassword: "",
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
      cpassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Required"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      setConflictError(false);
      setServerError(false)

      try {
        const res = await axios.post("/api/signup", {
          email: values.email,
          password: values.password,
        });

        if (res.status === 201) {
          setLoading(false);
          toast.success("User Successfully Created")
          router.replace("/main/links");
        }
      } catch (err) {
        const error: AxiosError = err as AxiosError

        // @ts-ignore
        if (error.response.status === 409) {
          setLoading(false);
          setConflictError(true);
        }

        //@ts-ignore
        if( error.response.status === 500 ){
          setLoading(false);
          setServerError(true);
        }
        
      }
    },
  });

  return (
    <div className="w-full h-screen flex flex-col md:justify-center items-center p-6">
      <div className="w-full md:w-[60%] lg:w-[50%] mt-8 md:mt-0">
        <div className="flex justify-start md:justify-center">
          <img src="/images/logo.png" alt="Devlink logo" />
        </div>
        {conflictError ? (
          <Alert variant="destructive" className="mt-3">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>User with email already exists.</AlertDescription>
          </Alert>
        ) : (
          ""
        )}
        {serverError ? (
          <Alert variant="destructive" className="mt-3">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>An unexpected error occured.</AlertDescription>
          </Alert>
        ) : (
          ""
        )}
        <div className="mt-3 w-full">
          <h1 className="font-bold text-2xl md:text-3xl text-[#333333]">
            Create account
          </h1>
          <p className="text-[#737373]">
            Let's get you started sharing your links
          </p>
          <form
            className="mt-5 flex flex-col gap-5"
            onSubmit={formik.handleSubmit}
          >
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
            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="text-xs">
                Confirm password
              </label>
              <div
                className={`flex items-center gap-2 border-[1px] ${
                  focused === "cpassword"
                    ? "border-main shadow-xl shadow-main/50 border-2"
                    : ""
                } p-3 rounded-md`}
              >
                <IoIosLock className="w-[5%]" />
                <input
                  type="password"
                  name="cpassword"
                  id="cpassword"
                  className="outline-none rounded-md w-[95%]"
                  placeholder="At least 8 characters"
                  onFocus={() => {
                    setFocused("cpassword");
                  }}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.cpassword}
                />
              </div>
              {formik.errors.cpassword || formik.touched.cpassword ? (
                <p className="text-xs text-red-600">
                  {formik.errors.cpassword}
                </p>
              ) : (
                ""
              )}
              <p className="text-[#737373] text-xs">
                Password must contain at least 8 characters
              </p>
            </div>
            <button
              className="w-full bg-main text-white p-3 font-semibold rounded-md disabled:bg-slate-600 flex justify-center"
              disabled={loading}
            >
              {loading ? (
                <AiOutlineLoading3Quarters className="animate-spin" size={28} />
              ) : (
                "Create new account"
              )}
            </button>
          </form>
          <p className="text-center text-[#737373] mt-2">
            Already have an account?{" "}
            <Link href={"/login"}>
              <span className="text-main">Login</span>
            </Link>{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default page;
