import { Request, Response } from "express";

import { asyncHandler } from "../../../app/middleware/asyncHandler.middleware.js";
import * as authService from "../services/auth.service.js";
import { sendSuccess } from "../../../shared/utils/response.js";

//create user logic
export const registerUser = asyncHandler(async (req: Request, res: Response) => {
  const user = await authService.registerUser(req.body);
  sendSuccess(res, {
    message: "user created successfullt",
    data: user,
  });
});
// export const updateUser = asyncHandler( async (_req:Request,_res:Response)=>{
// //create user logic
// })
// export const getUser = asyncHandler( async (_req:Request,_res:Response)=>{
// //create user logic
// })
export const getCurrentUser = asyncHandler(async (req: Request, res: Response) => {
  const currentUser = await authService.getCurrentUser(req.body.id);
  sendSuccess(res, { data: currentUser });
});
