import Head from "next/head";
import { FC, useState } from "react";
import { SomeComponent } from "./SomeComponent";

const HeadMain: FC = () => {
  const [title, setTitle] = useState("Test Title"); // 검색엔진에 수집될 때 처음 설정한거로 수집될거임
  const [visible, setVisible] = useState(false);

  return (
    <main>
      <Head>
        {/* <title>{title}</title> */}
        <title>Title</title>
        <meta name="description" content="Head Main" />
      </Head>
      {/* <button onClick={() => setTitle("Changed Title")}>Change Title</button> */}
      
      {/* 1. Head 가 있는 컴포넌트 -> head 태그 중첩 사용 */}
      {/* <SomeComponent /> */}
      {/* head 컴포넌트가 중첩되면 head 태그의 동작을 예측하기 힘들다.
          따라서 next 에서 권장하는 것은 최상위에서 한번만 사용하는 것     
      */}

      {/* 2. Head 태그를 가진 컴포넌트가 조건부로 렌더링 될 때  */}
      {/* <button onClick={() => setVisible(!visible)}>
        Mounted Some Component
      </button>
      {visible && <SomeComponent />} */}
      {/* 하위 컴포넌트에서 이와 같이 사용할 경우 이도 역시 동작 예측이 어려워지기 때문에
      최상위 컴포넌트서 이와 같이 사용할 것을 권장 */}
    </main>
  );
};

// 
// 

export { HeadMain };
