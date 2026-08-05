import { Router } from "express";
import { validateBody } from "../../../app/middleware/validate.middleware.js";
import { createUserSchema } from "../validators/auth.validator.js";
import * as authController from "../controllers/auth.controller.js";

const authrouter = Router();
authrouter.post("/register", validateBody(createUserSchema), authController.registerUser);
export default authrouter;
