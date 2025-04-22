import dayjs from "dayjs";
import { GetStaticProps } from "next";
import { FC } from "react";

interface Props {
  test: string;
}

export const getStaticProps: GetStaticProps<Props> = () => {
  return {
    props: {
      test: dayjs().format("YYYY-MM-DD HH:mm:ss"),
    },
  };
};

const SsgPage: FC<Props> = (props) => {
  console.log(props);
  return (
    <main>
      {/* getStaticProps 함수에서 실행된 데이터를 고정적으로 반환해줌 */}
      {/* ssg 된 데이터 */}
      {props.test}
      {/* 클라이언트에서 실행  */}
      {/* csr 로 생성한 데이터 */}
      <p>{dayjs().format("YYYY-MM-DD HH:mm:ss")}</p>
    </main>
  );
};

export default SsgPage;

// npm run dev -> 개발모드로 실행할 시
// getStaticProps 함수는 페이지에 접속할 떄마다 실행

// npm run build 를 해서 빌드를 한 후 npm run start 실행하면
// getStaticProps 함수는 빌드될 때 기점으로 한번만 실행 -> 고정된 데이터
