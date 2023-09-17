import Navbar from "@/components/Navbar";
import Portal from "@/components/portal";
import React, { useEffect } from "react";
import { useRouter } from "next/router";

export default function TestPortal() {
  useEffect(() => {
    const handleBackButton = (e) => {
      e.preventDefault();
      alert("Back button is disabled on this page.");
      window.history.pushState(null, null, window.location.pathname);
    };

    window.history.pushState(null, null, window.location.pathname);
    window.addEventListener("popstate", handleBackButton);

    return () => {
      window.removeEventListener("popstate", handleBackButton);
    };
  }, []);
  return (
    <>
      <main>
        <Navbar />
        <Portal />
      </main>
    </>
  );
}
