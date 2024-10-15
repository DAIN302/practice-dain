import { useInfiniteQuery } from "@tanstack/react-query";
// API 호출할 hook

// API 호출 함수
const fetchTopRatedMovies = async (page) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/top_rated?page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
        },
      }
    );
    return response.json();
  } catch (error) {
    console.error(error);
  }
};

// react query 이용한 무한 스크롤 hook
const useGetTopRatedMovies = () => {
  return useInfiniteQuery({
    queryKey: ["top-rated-movie"], // 이름 붙여주는 key
    queryFn: ({ pageParam }) => {
      // pageParam 기본으로 갖고 있음!, getNextPageParam 에서 갖고옴
      return fetchTopRatedMovies(pageParam);
    },
    getNextPageParam: (last) => {
      // last - 지난 결과값
      if (last.page < last.total_pages) {
        return last.page + 1; // 1씩 증가시킨 값 반환 -> pageParam으로 들어감
      } else {
        // return undefined;
      }
    },
    initialPageParam: 1, // 1페이지부터 시작
  });
};

export default useGetTopRatedMovies;
