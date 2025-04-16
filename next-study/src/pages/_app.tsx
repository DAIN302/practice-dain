import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect } from "react";

let href = "";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    // 라우터 이벤트 감지

    // 페이지 이동하기 직전에 어떠한 액션을 해야할 떄 사용
    router.events.on("routeChangeStart", () => {
      console.log("route change start");
      href = window.location.href;
    });
    router.events.on("routeChangeComplete", () => {
      console.log("route change end", "from = ", href);
      href = "";
    });
  }, [router.events]);
  return <Component {...pageProps} />;
}
