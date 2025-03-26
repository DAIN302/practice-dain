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
        }
    })
}
