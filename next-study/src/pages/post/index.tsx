import { fetchPost } from "@/api/post";
import { PostMain } from "@/domains/post";
import dayjs from "dayjs";
import { GetStaticProps } from "next";
import { ComponentProps, FC } from "react";

type Props = ComponentProps<typeof PostMain>;

export const getStaticProps: GetStaticProps<Props> = async () => {
  const post = await fetchPost("1");

  return {
    props: {
      post,
      date: dayjs().format('YYYY-MM-DD HH:mm:ss')
    },
  };
};

const PostMainPage: FC<Props> = (props) => {
  return <PostMain {...props} />;
};

export default PostMainPage;
