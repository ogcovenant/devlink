"use client";

import Header from "@/components/Header";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useProfileCtx } from "@/contexts/UserContext";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const { isAuthenticated } = useProfileCtx();
  const [screenLoading, setScreenLoading] = useState(false);

  useEffect(() => {
    setScreenLoading(true);

    if (!isAuthenticated) {
      router.replace("/login");
    } else {
      setScreenLoading(false);
    }
  }, [isAuthenticated]);

  const location = usePathname();
  const [active, setActive] = useState("");

  useEffect(() => {
    if (location === "/main/links" || location === "/main/links/") {
      setActive("links");
    }

    if (location === "/main/profile" || location === "/main/profile/") {
      setActive("profile");
    }
  }, [location]);

  return (
    <html lang="en" className="overflow-hidden">
      <body className="h-screen !overflow-hidden">
        {!screenLoading ? (
          <>
            <Header active={active} />
            <div>{children}</div>
          </>
        ) : (
          <>
            <div className="absolute w-full h-screen bg-white flex justify-center items-center">
              <img
                src="/images/logo.png"
                alt="devlink logo"
                className="animate-pulse"
              />
            </div>
          </>
        )}
      </body>
    </html>
  );
}
