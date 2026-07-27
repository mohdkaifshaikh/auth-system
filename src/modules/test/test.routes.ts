// src/modules/test/test.routes.ts

import { Router } from "express";
import { BadRequestError } from "../../shared/errors/index.js";

const router = Router();

router.get("/success", (req, res) => {
  req.log.info("Success endpoint called");

  res.json({
    success: true,
    requestId: req.id,
  });
});

router.get("/warn", (req, res) => {
  req.log.warn("Warning test");

  res.status(400).json({
    success: false,
  });
});

router.get("/error", () => {
  throw new Error("Unexpected error");
});

router.get("/app-error", () => {
  throw new BadRequestError("This is a BadRequestError");
});

export default router;
