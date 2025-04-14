import { FC } from "react";
import image1 from "./bmo2.jpg";
import image2 from "./moon.jpg";
import styles from "./index.module.css";
import Image from "next/image";

// fill
// 부모-자식 엘리먼트 활용

const FillMain: FC = () => {
  return (
    <main>
      <div className={styles.grid}>
        <div>
          {/* 최적화 X */}
          <Image src={image1} alt="image" />
        </div>
        <div>
          {/* 최적화 O */}
          <Image
            src={image2}
            alt="image"
            fill
            sizes="
            (max-width:749px) 100vw,
            (min-width:750px) 50vw
            "
          />
        </div>
      </div>
    </main>
  );
};

export { FillMain };
