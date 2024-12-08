import { City, Place } from "@/types";

// plan 에 필요한 api 데이터
export const getCity = async (cityId: string): Promise<City> => {
  return fetch(`/api/cities/${cityId}`).then((res) => res.json());
};

// place api
export const getPlaces = async (
  city: string,
  query: { category?: string; q?: string } = {}
):Promise<Place[]> => {
  const queryString = new URLSearchParams(query).toString();
  return fetch(
    `/api/cities/${city}/places${queryString ? `?${queryString}` : ""}`
  ).then((res) => res.json());
};
