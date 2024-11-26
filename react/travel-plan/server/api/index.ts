import { Router } from "express";
import cityRouter from "./city";

const apiRouter = Router();

apiRouter.use("/cities", cityRouter);

export default apiRouter;
