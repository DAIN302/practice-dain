import { City } from "@/types";

// home 에 필요한 api 데이터
export const getCities = async (): Promise<City[]> => {
  const response = await fetch("/api/cities");
  if (!response.ok) throw new Error("Failed to fetch");
  return response.json();
};

// 검색 api
export const getSearchedCities = async (search: string): Promise<City[]> => {
  const response = await fetch(`/api/cities/search?q=${search}`);
  if (!response.ok) throw new Error("Failed to fetch");
  return response.json();
};
