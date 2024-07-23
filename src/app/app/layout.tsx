"use client";

import Header from "@/components/Header";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const location = usePathname();
  const [active, setActive] = useState("");

  useEffect(() => {
    if (location === "/app/links") {
      setActive("links");
    }

    if (location === "/app/profile") {
      setActive("profile");
    } 
  }, [location]);

  return (
    <html lang="en" className="overflow-hidden">
      <body className="h-screen !overflow-hidden">
        <div>
          <Header active={active} />
        </div>
        <div>{children}</div>
      </body>
    </html>
  );
}
