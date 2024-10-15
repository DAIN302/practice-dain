import "./App.css";
import useGetTopRatedMovies from "./hooks/useGetTopRatedMovies";
import styled from "styled-components";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

const MovieContainer = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
}));

const MovieItem = styled("div")(({ theme }) => ({
  padding: "10px",
  border: "1px solid #ccc",
  borderRadius: "8px",
  textAlign: "center",
}));

const MovieImage = styled("img")(({ theme }) => ({
  width: "200px",
  height: "300px",
  objectFit: "cover",
  borderRadius: "8px",
}));

const MovieTitle = styled("h2")(({ theme }) => ({
  fontSize: "1.2rem",
  margin: "10px 0 5px",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  width: "200px",
}));

function App() {
  // 데이터 정보와, 로딩 정보, 에러 정보를 줌, 다음 페이지 정보도 줌
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetTopRatedMovies();  

  // loadmore 가 화면에 보이는 순간
  // 다시 fetchNextPage 호출
  const { ref, inView } = useInView(); // ref - 필요한 요소 선택할 수 있음, inView - ref 로 선택한 요소가 화면에 보이면 true 로 바뀜

  // inView 값이 바뀔때마다 호출
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      console.log(data);
      fetchNextPage();
      
    }
  }, [inView]);

  return (
    <div className="App">
      <div
        style={{
          maxwidth: "1000px",
          margin: "auto",
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        {data?.pages.map((page, index) =>
          page.results.map((movie) => (
            <MovieContainer item sm={4} sx={12} key={movie.id}>
              <MovieItem>
                <MovieImage
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                />
                <MovieTitle>{movie.title}</MovieTitle>
              </MovieItem>
            </MovieContainer>
          ))
        )}
      </div>
      {/* 무한 스크롤 하단 UI */}
      <h1 ref={ref}>Load more</h1>
    </div>
  );
}

export default App;
