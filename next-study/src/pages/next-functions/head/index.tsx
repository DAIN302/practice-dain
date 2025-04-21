import { HeadMain } from "@/domains/next-functions/head";
import { GetStaticProps } from "next";
import Head from "next/head";
import { FC } from "react";

interface Props {
  title: string;
//   thumbnail: string;
}

// 서버에서 실행
export const getStaticProps: GetStaticProps<Props> = async () => {
  // 타이틀을 유동적으로 설정하고 싶을 때
  const result = await fetch("Some API");
  const data = await result.json();

  return {
    props: {
      //   title: data.product_name,
      title: "서버에서 내려준 타이틀입니다.",
    //   thumbnail: data.thumbnail,
    },
  };
};

const HeadPage: FC<Props> = (props) => {
  return (
    <>
      <Head>
        <title>{props.title}</title>
        {/* <meta name="og:thumbnail" content={props.thumbnail} /> */}
      </Head>
      <HeadMain />
    </>
  );
};

export default HeadPage;
