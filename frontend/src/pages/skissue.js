import Head from "next/head";
import React from "react";

function Skissue() {
  return (
    <>
      <Head></Head>
      <main className="h-screen flex items-center justify-center">
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/dQw4w9WgXcQ?si=uUTDPMfM6-O-NK2g&autoplay=1"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
          className="w-full h-full"
        />
      </main>
    </>
  );
}

export default Skissue;
