"use client";

import Link from "next/link";
import React, { useState } from "react";
import { FaEnvelope } from "react-icons/fa";
import { IoIosLock } from "react-icons/io";
import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const page = () => {
  const router = useRouter();

  const [focused, setFocused] = useState("");
  const [loading, setLoading] = useState(false);
  const [notFoundError, setNotFoundError] = useState(false);
  const [unauthorizedError, setUnauthorizedError] = useState(false);
  const [serverError, setServerError] = useState(false)

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
    onSubmit: async (values) => {
      setLoading(true);

      try {
        const res = await axios.post("/api/login", {
          email: values.email,
          password: values.password,
        });

        if (res.status === 200) {
          setLoading(false);
          toast.success("User Successfully logged in");
          router.replace("/main/links");
        }
      } catch (err) {
        const error: AxiosError = err as AxiosError;

        // @ts-ignore
        if (error.response.status === 404) {
          setLoading(false);
          setNotFoundError(true);
        }

        // @ts-ignore
        if (error.response.status === 401) {
          setLoading(false);
          setUnauthorizedError(true);
        }

        //@ts-ignore
        if (error.response.status === 500) {
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
        {notFoundError ? (
          <Alert variant="destructive" className="mt-3">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>User with email does not exist.</AlertDescription>
          </Alert>
        ) : (
          ""
        )}
        {unauthorizedError ? (
          <Alert variant="destructive" className="mt-3">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>Incorrect password.</AlertDescription>
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
        <div className="mt-10">
          <h1 className="font-bold text-2xl md:text-3xl text-[#333333]">
            Login
          </h1>
          <p className="text-[#737373]">
            Add your details below to get back into the app
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
            <button
              className="w-full bg-main text-white p-3 font-semibold rounded-md disabled:bg-slate-600 flex justify-center"
              disabled={loading}
            >
              {loading ? (
                <AiOutlineLoading3Quarters className="animate-spin" size={28} />
              ) : (
                "Login"
              )}
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
