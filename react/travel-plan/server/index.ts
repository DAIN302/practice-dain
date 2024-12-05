import express from "express";
import apiRouter from "./api";

const server = await (async () => {
  const app = express();
  const port = 8080;

  app.use(express.json());
  app.use("/api", apiRouter);

  app.get("/", (req, res) => {
    res.send("hello world");
  });

  return app.listen(port, () => {
    console.log(`server... http://localhost:${port}`);
  });
})();

// vite node 를 사용해서 한 로드가 동작할 때 이전에 실행된 서버를 닫아줌
(() => {
  if (import.meta.hot) {
    import.meta.hot.accept(async () => {
      await server.close();
    });
  }
})();
