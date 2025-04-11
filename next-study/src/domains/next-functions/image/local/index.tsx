import { FC } from "react";
import bmo from "./bmo2.jpg";
import Image from "next/image";

const LocalMain: FC = () => {
  return (
    <main>
      <Image src={bmo} width={500} alt="bmo" placeholder="blur"/>
      {/* static import 한 사진은 width, heigth 둘 중 하나만 입력하면
      그 사이즈에 맞춰서 자동으로 비율에 맞춰서 리사이징(둘다 쓰면 찌그러질 수 있음) */}
      {/* placeholder="blur"
      원본 이미지가 로드되기 전에 작은 용량의 블러된 이미지를 먼저 볼 수 있음
       */}
    </main>
  );
};

export { LocalMain };
