import { Post } from "@/api/post";
import { useRouter } from "next/router";
import { FC } from "react";

interface Props {
  post: Post;
}

const PostDetail: FC<Props> = (props) => {
  const { post } = props;

  // 데이터 준비될 때 수동 처리
  const router = useRouter();
  
  if(router.isFallback){
    // fallback 상태면(데이터 준비상태면) 아래 반환
    return <main>Loading...</main>
  }
  


  return (
    <main>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </main>
  );
};

export { PostDetail };
