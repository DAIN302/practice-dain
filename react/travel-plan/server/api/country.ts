import { Router } from "express";
import { Country } from "../types";
import { countriesDB } from "../db";

// 라우터 설정
const countryRouter = Router();

countryRouter.get("/", (req, res) => {
  // find -> 전체 파일 리턴
  countriesDB.find({}, (err: Error | null, docs: Country[]) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(docs);
    }
  });
});


countryRouter.post("/", (req, res) => {
  const country = req.body as Country;
  // insert -> db 에 등록
  countriesDB.insert(country, (err: Error | null, doc: Country) => {
    if (err) {
      res.status(500).send(err);
    } else {
      // 성공 시 생성된 데이터 넘겨줌
      res.send(doc);
    }
  });
});

export default countryRouter;
