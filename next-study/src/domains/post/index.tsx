import { Post } from "@/api/post";
import { FC } from "react";

interface Props {
  post: Post;
  date: string;
}

const PostMain: FC<Props> = (props) => {
  const { post, date } = props;

  console.log(post);

  return (
    <main>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
      <p>{date}</p>
    </main>
  );
};

export { PostMain };
