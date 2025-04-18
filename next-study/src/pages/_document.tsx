import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
        {/* beforeInteractive */}
        <Script id="log-body-before" strategy="beforeInteractive">
          {`
              const body_before = document.getElementById('__next');
              console.log('Before Interactive', body_before);
            `}
        </Script>
        {/* before -> body_before 가 null
        script 태그가 head 태그에 있음
         */}
        <Script id="log-body-after" strategy="afterInteractive">
          {`
              const body_after = document.getElementById('__next');
              console.log('After Interactive', body_after);
            `}
        </Script>
        {/* after -> body_after 가 __next 를 가진것을 잘 가져옴
        script 태그가 바디태그 최하단에 있음 */}
        <Script id="log-body-lazy" strategy="lazyOnload">
          {`
              const body_lazy = document.getElementById('__next');
              console.log('Lazy On Load', body_lazy);
            `}
        </Script>
        {/* lazy on load -> 가장 최하단에 추가 */}
        {/* worker 는 실험기능 */}
      </body>
    </Html>
  );
}
