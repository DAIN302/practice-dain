import express from "express";
import JsonStorage from "../../utils/jsonStorage";
import path from "path";
import { SectionData, Statistics, SurveyResponse } from "../../types/app";
import { getStatistics } from "../../utils/statistics";

// 라우터 설정
const router = express.Router();
// 스토리지 설정
const storage = new JsonStorage<{
  sections: SectionData[];
  emailCollected: boolean;
  responses: SurveyResponse[];
}>(path.join(__dirname, "../data/surveys.json"));

// api 설정
router.get("/", (_req, res) => {
  return res.json(storage.getAll());
});

router.post("/", (req, res) => {
  const id = Date.now();
  storage.set(id, {
    ...req.body,
    emailCollected: false,
  });
  return res.json({ id });
});

router.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  storage.set(id, req.body);
  return res.json({ id });
});

router.patch("/:id", (req, res) => {
  const id = Number(req.params.id);
  const data = storage.get(id);
  storage.set(id, {
    ...data,
    ...req.body,
  });
  return res.json({ id });
});

router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const data = storage.get(id);

  if (!data) {
    // data 가 없으면 404 error
    res.status(404).json({ message: "Not Found" });
  }

  return res.json(data);
});

router.post("/:id/responses", (req, res) => {
  const id = Number(req.params.id);
  const data = storage.get(id);

  if (!data) {
    return res.status(404).json({ message: "Not Found" });
  }

  storage.set(id, {
    ...data,
    responses: [...(data.responses ?? []), req.body],
  });

  return res.status(201).json({ message: "Response added" });
});

// 통계 데이터
router.get("/:id/statistics", (req, res) => {
  const id = Number(req.params.id);
  const data = storage.get(id);

  if (!data) {
    return res.status(404).json({ message: "Not Found" });
  }

  const { responses, sections } = data;

  const statistics: Statistics = getStatistics(responses, sections);

  return res.json({ statistics, count: responses.length });
});

export default router;
