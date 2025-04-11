import { FC } from "react";
import bmo from "./bmo2.jpg";
import Image from "next/image";

const LocalMain: FC = () => {
  return (
    <main>
      <Image src={bmo} width={500} alt="bmo" placeholder="blur" quality={100} priority/>
      {/* static import 한 사진은 width, heigth 둘 중 하나만 입력하면
      그 사이즈에 맞춰서 자동으로 비율에 맞춰서 리사이징(둘다 쓰면 찌그러질 수 있음) */}
      {/* placeholder="blur"
      원본 이미지가 로드되기 전에 작은 용량의 블러된 이미지를 먼저 볼 수 있음
       */}
       {/* quality : 퀄리티 조정 1~100 숫자 지정 가능 작을 수록 용량이 적어지나 퀄리티가 떨어짐(화질구지됨)
       기본값은 80 */}
       {/* priority : 이 옵션을 주면 이미지가 좀 더 빠르게 로드됨
       이미지 프리로드 해줌 패치 우선순위도를 높여줌
       메인이미지나 빨리 로드되어야 하는 이미지는 이 옵션을 주면 좋음 */}
    </main>
  );
};

export { LocalMain };
