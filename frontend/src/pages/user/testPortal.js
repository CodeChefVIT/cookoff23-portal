import Navbar from "@/components/Navbar";
import Portal from "@/components/portal";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

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
      <Head>
        <title>Portal</title>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <main>
        <Navbar />
        <Portal />
      </main>
    </>
  );
}
