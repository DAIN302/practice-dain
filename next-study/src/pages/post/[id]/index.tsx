import { fetchPost, fetchPostList } from "@/api/post";
import { PostDetail } from "@/domains/post/detail";
import { GetStaticPaths, GetStaticPathsResult, GetStaticProps } from "next";
import { ComponentProps, FC } from "react";

// dynamic 으로 id 받아오기
type Params = { id: string };
type Props = ComponentProps<typeof PostDetail>;

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  // post 목록들을 가져옴
  // fetchPostList 함수로 게시글 목록을 받아와서 그 목록의 id를 가지고 어떤 id들이
  // 있을 수 있는 지 알려줌
  const result = await fetchPostList();
  console.log("Post List", result);

  // 포스트 리스트 잘라내기
  const sliced_post_list = result.slice(0, 3);

  // 어떤 경로가 있는지 반환
  const paths: GetStaticPathsResult<Params>["paths"] = sliced_post_list.map(
    (post) => {
      return {
        params: { id: post.id.toString() },
      };
    }
  );

  return {
    paths: paths,
    // fallback: false, // 미리 준비되지 않은 페이지 Not Found
    // fallback: 'blocking', // 요청 시 페이지 생성 및 데이터가 준비될 때까지 응답 대기
    fallback: true, // 요청 시 페이지 생성 및 페이지 선 응답, 데이터가 준비되면 반환
  };
};

// dynamic 쓴 상태에서 getStaticProps 만 쓰면 에러남 getStaticPaths 를 써야함
// 빌드를 할 때는 id에 어떤 값이 들어올지 예측 불가
// 그래서 getStaticPaths 를 같이 써줌

export const getStaticProps: GetStaticProps<Props, Params> = async (
  context
) => {
  const id = context.params?.id;

  if (!id) {
    return { notFound: true };
  }

  // 다이내믹 라우팅으로 접속한 id를 가지고 호출
  const post = await fetchPost(id);

  return {
    props: {
      post,
    },
  };
};

const PostDetailPage: FC<Props> = (props) => {
  return <PostDetail {...props} />;
};

export default PostDetailPage;

// 빌드를 할 때는 id에 어떤 값이 들어올지 예측 불가
// 그래서 getStaticPaths 를 같이 써줌 -> 안쓰고 getStaticProps 만 쓰면 에러
// getStaticPaths의 역할
// 미리 생성해야 될 페이지의 파라미터를 만들어주는 역할을 함
// 즉, 생성해야할 path를 미리 정의해 줌
// 단점 : 페이지가 많아지면 빌드해야할 양이 많아짐 그에 따라 빌드 시간도 늘어남

// 미리 만들어두지 않은 페이지를 요청하게 되면 그때 만들어서 유저에게 보내주고 캐싱
// fallback 옵션을 사용하면 
// getStaticPaths 에서 미리 생성하지 않은 페이지 생성 처리 및 캐싱
// 첫 요청 시 페이지 생성, 이후 요청은 캐싱된 페이지 응답
// false : 미리 준비되지 않은 페이지 Not Found
// blocking : 요청 시 페이지 생성 및 데이터가 준비될 때까지 응답 대기
// true : 요청 시 페이지 생성 및 페이지 선 응답, 데이터가 준비되면 반환