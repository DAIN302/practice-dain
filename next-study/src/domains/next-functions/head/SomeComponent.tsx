import Head from "next/head";
import { FC } from "react";

const SomeComponent: FC = () => {
  return (
    <>
      <Head>
        <title>Some component Title</title>
      </Head>
      <p>Some component mounted</p>
    </>
  );
};

export { SomeComponent };
