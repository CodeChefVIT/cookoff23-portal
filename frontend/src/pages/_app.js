import "@/styles/globals.css";
import TokenRefresher from "@/utils/tokenRefresher";

export default function App({ Component, pageProps }) {
  return (
    <>
      <TokenRefresher />
      <Component {...pageProps} />
    </>
  );
}
