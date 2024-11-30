import { Router } from "express";
import { City, Country } from "../types";
import { citiesDB, countriesDB } from "../db";

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
    { city: req.params.city },
    (err: Error | null, city: City) => {
      if (err) {
        res.status(500).send(err);
      } else {
        // 국가 정보 데이터와 조합
        countriesDB.findOne({ code: city.country }, (error, country) => {
          if (error) {
            return res.status(500).send(error);
          } else if (!country) {
            return res.status(404).send("Country Not Found");
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

export default cityRouter;
