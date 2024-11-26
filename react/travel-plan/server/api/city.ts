import { Router } from "express";
import DataStore from "nedb";
import { City } from "../types";

// db 설정
// nedb -> 파일 기반
const db = new DataStore({ filename: "data/cities.db", autoload: true });

// 라우터 설정
const cityRouter = Router();

cityRouter.get("/", (req, res) => {
  // find -> 전체 파일 리턴
  db.find({}, (err: Error | null, docs: City[]) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(docs);
    }
  });
});

cityRouter.get("/:city", (req, res) => {
  // findOne -> 한개만 찾기
  db.findOne({ city: req.params.city }, (err: Error | null, doc: City) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(doc);
    }
  });
});

cityRouter.post("/", (req, res) => {
  const city = req.body as City;
  // insert -> db 에 등록
  db.insert(city, (err: Error | null, doc: City) => {
    if (err) {
      res.status(500).send(err);
    } else {
      // 성공 시 생성된 데이터 넘겨줌
      res.send(doc);
    }
  });
});

export default cityRouter;
