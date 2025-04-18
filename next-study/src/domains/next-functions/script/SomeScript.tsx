import Script from "next/script";
import { FC } from "react";

const SomeScript: FC = () => {
  return (
    <Script strategy="afterInteractive" id="some-script">
      {/* strategy 의 기본값은 afterInteractive 라서 원래는 생략 가능 */}
      {/* beforInteractive 를 사용하면 실행순서가 보장되지 않기 때문에 _document.tsx 외의 컴포넌트 파일에서
      사용하는 것은 권장되지 않음(사용하면 warning 뜸) */}
      {`
        console.log('Some Script')      
    `}
    </Script>
  );
};

export { SomeScript };
