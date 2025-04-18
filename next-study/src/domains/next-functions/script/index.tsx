import { FC, useState } from "react";
import { SomeScript } from "./SomeScript";
import Link from "next/link";
import Script from "next/script";

// 외부 cdn 의 타입에러를 없애주기 위한 타입 정의
declare global {
    interface Window {
        dayjs: () => {
            format:(params:string) => string;
        }
    }
}

const ScriptMain: FC = () => {
  const [visible, setVisible] = useState(false);

  const onLoad = () => {
    console.log("On Load");
    // OnLoad 이벤트는 다른 페이지에 갔다가 뒤로가기해서 다시 돌아와도 캐싱이 되어서 재로드되지 않는다.
  };

  const onReady = () => {
    // console.log("On Ready", window.dayjs()); 
    // dayjs를 외부 cdn 으로 가져와서 타입 에러가 난다.
    console.log("On Ready", window.dayjs().format('YYYY-MM-DD HH:mm:ss')); 
  };

  return (
    <main>
      {visible && <SomeScript />}
      <button onClick={() => setVisible(true)}>Load Script</button>
      <Link href={`/next-functions/script/some-route`}>Go to OtherPage</Link>

      {/* 외부 cdn으로 dayjs 라이브러리 가져오기 */}
      <Script
        type="text/javascript"
        src="https://cdn.jsdelivr.net/npm/dayjs@1/dayjs.min.js"
        onLoad={onLoad}
        onReady={onReady}
      />
      {/* 외부 주소인 경우에는 src 가 캐싱키가 됨 id를 쓰지 않아도 된다.  */}
    </main>
  );
};

export { ScriptMain };
