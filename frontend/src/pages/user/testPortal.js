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

    const handleContextMenu = (e) => {
      e.preventDefault();
      alert("Right-click context menu is disabled on this page.");
    };

    window.history.pushState(null, null, window.location.pathname);
    window.addEventListener("popstate", handleBackButton);
    window.addEventListener("contextmenu", handleContextMenu);

    return () => {
      window.removeEventListener("popstate", handleBackButton);
      window.removeEventListener("contextmenu", handleContextMenu);
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
