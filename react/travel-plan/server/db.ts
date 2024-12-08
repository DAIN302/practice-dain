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

export const placesDB = new DataStore({
  filename: "data/places.db",
  autoload: true,
});

// 인덱싱
// 도시 구분자로 인덱싱
placesDB.ensureIndex({ fieldName: "city" });
