import DataStore from "nedb";

// db 설정
// nedb -> 파일 기반
export const countriesDB = new DataStore({
  filename: "data/countries.db",
  autoload: true,
});

export const citiesDB = new DataStore({
  filename: "data/cities.db",
  autoload: true,
});
