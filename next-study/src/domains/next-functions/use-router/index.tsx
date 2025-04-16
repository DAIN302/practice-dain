import { useRouter } from "next/router";
import { FC, useEffect } from "react";

const UseRouterMain: FC = () => {
  const router = useRouter();

  //   useEffect(() => {
  //     // 라우터 이벤트 감지

  //     // 페이지 이동하기 직전에 어떠한 액션을 해야할 떄 사용
  //     router.events.on('routeChangeStart', () => {
  //         console.log("route change start");
  //     });
  //     router.events.on("routeChangeComplete", ()=>{
  //         console.log("route change end");

  //     })
  //   }, [router.events]);

  return (
    <main className="p-10">
      <ol>
        <li>{router.pathname}</li>
        <li>{router.query.query}</li>
        <li>{router.asPath}</li>
      </ol>
      <ol>
        <li>
          <button onClick={() => router.back()}>Back</button>
        </li>
        <li>
          <button onClick={() => router.forward()}>Forward</button>
        </li>
        <li>
          <button onClick={() => router.reload()}>Reload</button>
        </li>
        <li>
          <button onClick={() => router.push("/")}>Push to /</button>
        </li>
        <li>
          <button onClick={() => router.replace("/")}>Replace</button>
        </li>
        <li>
          <button onClick={() => router.prefetch("/")}>prefetch</button>
        </li>
      </ol>
    </main>
  );
};

export { UseRouterMain };

// 내용을 가져오는 메서드
// router.pathname
// / 다음부터 나오는 주소 이름을 가져옴

// router.query.파라미터
// query 파라미터 가져옴
// 예를 들어 주소창의 파라미터가 ?query=test 면 router.query.query 를 했을때 test 를 가져옴

// router.asPath
// query 를 포함한 전체 주소를 가져옴

// 동작 메서드
// router.back() 뒤로가기
// router.forward() 앞으로가기
// router.reload() 새로고침
// router.push("주소") 푸시  push("/") 홈으로 감
// router.replace("주소") 현재 페이지를 다른 페이지로 교체
// push 와 replace 는 권장되지 않음 link 태그가 있어야 접근성이 좋음
// router.prefetch("주소") 경로에 있는 페이지 프리패치

// router.basePath 
// 배포한 주소랑 테스트 주소가 다를 때 쓰는 것
