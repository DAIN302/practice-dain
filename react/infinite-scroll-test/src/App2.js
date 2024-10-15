import React, { useState, useEffect, useRef } from "react";

export default function App2() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [pageParams, setPageParams] = useState([]); // page history 저장, 기존의 호출된 페이지는 더 호출안하도록

  // 화면에 보이는지 안보이는지 체크를 위한 ref
  const observerRef = useRef();

  const fetchTopRatedMovies = async (page) => {
    if (pageParams.includes(page)) return; // 중복 호출 방지
    setIsLoading(true);
    try {
      // api 호출
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/top_rated?page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_API_KEY || ""}`,
          },
        }
      );

      const data = await response.json();
      setMovies((prevMovies) => [...prevMovies, ...data.results]); // 기존 데이터에 붙여넣기 하는 형식!
      setPageParams((prev) => [...prev, page]);
      setHasNextPage(data.page < data.total_pages);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // new IntersectionObserver(콜백, 옵션);
    const observer = new IntersectionObserver((entries)=>{ // entries - 관찰할 값들(배열값)
        const firstEntry = entries[0]
        if(firstEntry.isIntersecting && hasNextPage && !isLoading){ // 화면에 들어왔는지 확인
            console.log('????');
            
            setPage((prevPage) => prevPage + 1)
        } 
    });

    // 관찰할 대상 설정
    if(observerRef.current) observer.observe(observerRef.current);

    // 언마운트 시 관찰 대상 해제
    return () => {
        if(observerRef.current) observer.unobserve(observerRef.current);
    }
  }, [])
  

  // 페이지가 바뀌면 호출
  useEffect(() => {
    fetchTopRatedMovies(page);
  }, [page]);

  return (
    <div>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {movies?.map((movie) => (
          <figure key={movie.id}
            style={{ width: "200px", height: "300px", borderRadius: "10px" }}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              style={{
                width: "100%",
                objectFit: "cover",
                overflow: "hidden",
                borderRadius: "10px",
              }}
            />
            <span>{movie.title}</span>
          </figure>
        ))}
      </div>
      {/* 무한스크롤 하단부 UI */}
      <h1 ref={observerRef}>Load More</h1>
    </div>
  );
}
