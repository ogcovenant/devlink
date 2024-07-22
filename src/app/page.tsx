"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/login");
  }, []);

  return (
    <>
      <div className="flex w-full h-screen justify-center items-center animate-pulse">
        <img src="/images/logo.png" alt="DevLink logo" />
      </div>
    </>
  );
}
