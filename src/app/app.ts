import express, { urlencoded } from "express";
// import type { Request, Response } from "express";
// import { logger } from "./config/logger.js";

const app = express();

app.use(express.json());
app.use(urlencoded({ extended: true }));
app.get("/test", (req, res) => {
  res.json({
    message: "Logger working",
  });
});
export default app;
