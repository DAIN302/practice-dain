import { Router } from "express";
import { City, Country, Place } from "../types";
import { citiesDB, countriesDB, placesDB } from "../db";

// 라우터 설정
const cityRouter = Router();

// 전체 도시
cityRouter.get("/", (req, res) => {
  // find -> 전체 파일 리턴
  citiesDB.find({}, (err: Error | null, cities: City[]) => {
    if (err) {
      res.status(500).send(err);
    } else {
      countriesDB.find({}, (error: Error | null, countries: Country[]) => {
        if (error) {
          return res.status(500).send(error);
        } else if (countries.length === 0) {
          return res.status(404).send("Country Not Found");
        } else {
          const newCities = cities.map((city) => {
            const country = countries.find(
              (country) => country.code === city.country
            );
            return { ...city, country };
          });
          return res.send(newCities);
        }
      });
    }
  });
});

// 검색
cityRouter.get("/search", (req, res) => {
  const { q, filter } = req.query;

  if (typeof q !== "string") {
    return res.status(400).send("Invalid query");
  }

  const queryRegex = new RegExp(q, "i");

  const query = filter
    ? filter === "domestic"
      ? { county: "kr" }
      : { county: { $ne: "kr" } }
    : {};

  countriesDB.find(query, (err: Error | null, countries: Country[]) => {
    if (err) {
      return res.status(500).send(err);
    }

    const searchCountries = countries.filter((country) =>
      country.name.match(queryRegex)
    );
    const countriesRegex = new RegExp(
      searchCountries.map((country) => country.code).join("|"),
      "i"
    );

    const dbQuery =
      searchCountries.length > 0
        ? {
            $or: [{ name: new RegExp(q, "i") }, { country: countriesRegex }],
          }
        : {
            name: new RegExp(q, "i"),
          };

    citiesDB.find(dbQuery, (err: Error | null, cities: City[]) => {
      if (err) {
        return res.status(500).send(err);
      } else {
        const newCities = cities.map((city) => {
          const country = countries.find(
            (country) => country.code === city.country
          );
          return { ...city, country };
        });
        return res.send(newCities);
      }
    });
  });
});

// 특정 하나의 도시
cityRouter.get("/:city", (req, res) => {
  // findOne -> 한개만 찾기
  citiesDB.findOne(
    { code: req.params.city },
    (err: Error | null, city: City) => {
      if (err) {
        res.status(500).send(err);
      } else {
        // 국가 정보 데이터와 조합
        countriesDB.findOne({ code: city.country }, (err, country) => {
          if (err) {
            return res.status(500).send(err);
          } else if (!country) {
            return res.status(404).send("Country not found");
          } else {
            return res.send({ ...city, country });
          }
        });
      }
    }
  );
});

cityRouter.post("/", (req, res) => {
  const city = req.body as City;
  // insert -> db 에 등록
  citiesDB.insert(city, (err: Error | null, doc: City) => {
    if (err) {
      res.status(500).send(err);
    } else {
      // 성공 시 생성된 데이터 넘겨줌
      res.send(doc);
    }
  });
});

// 장소 생성
cityRouter.post("/:city/places", (req, res) => {
  const place = req.body;
  const city = req.params.city;

  placesDB.insert({ ...place, city }, (err: Error | null, place: Place) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.send(place);
    }
  });
});

// 장소 리스트 검색
// 필터와 검색이 되는 API
cityRouter.get("/:city/places", (req, res) => {
  const city = req.params.city;
  const category = req.query.category as
    | Place["category"]
    | Place["category"][]
    | undefined;
  const q = req.query.q as string;

  const query = {
    city,
    ...(category
      ? { category: { $in: Array.isArray(category) ? category : [category] } }
      : // array 여부 체크 후, array 면 그대로 넣고, 아니면 array로 만들어서 넣기
        {}), // category 가 있으면 city 와 category, 없으면 city 만
    ...(q ? { name: new RegExp(q, "i") } : {}),
  };

  placesDB.find(query, (err: Error | null, places: Place[]) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(places);
    }
  });
});

export default cityRouter;
