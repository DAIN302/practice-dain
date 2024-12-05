import { City } from "@/types";

// plan 에 필요한 api 데이터
export const getCity = async (cityId: string): Promise<City> => {
  return fetch(`/api/cities/${cityId}`).then((res) => res.json());
};
