// 데이터 가져오는 hook
import { gql } from "graphql-request";
import { useQuery } from "@tanstack/react-query";
import { graphqlClient } from "@/graphqlClient";

const GET_SONGS = gql`
  query GetSongs {
    song {
      id
      title
      artist
      genre
    }
  }
`;

export default function useGetSongs() {
    return useQuery({
        queryKey : ["songs"],
        queryFn : async () => {
            const data = await graphqlClient.request<{
                songs : {
                    id:number;
                    title:string;
                    artists:string;
                    genre:string;
                }
            }>(GET_SONGS);

            return data.songs;
        },
        throwOnError : true, // error 발생 시 error 던져주는 설정, error boundary 를 사용해서 에러 발생 시 catch 가능
    })
}
