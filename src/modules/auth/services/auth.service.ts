import { AppError } from "../../../shared/errors/app.error.js";
import * as authRepository from "../repository/auth.repository.js";
import type { CreateUserInput } from "../validators/auth.validator.js";
import { hashPassword } from "../utils/hashPassword.js";
import { DuplicateResourceError } from "../../../shared/errors/database/duplicate-resource-error.js";
import { NotFoundError } from "../../../shared/errors/not-found.error.js";

//create user logic
export const registerUser = async (userData: CreateUserInput) => {
  try {
    const { name, email, password, phone } = userData;
    const passwordHash = await hashPassword(password);
    return await authRepository.createuser({
      name,
      email,
      passwordHash,
      phone: phone ? phone : "undefined",
    });
  } catch (error) {
    if (error instanceof DuplicateResourceError) {
      throw new AppError({
        statusCode: 409,
        message: "Email Alredy exists",
        code: "Email_ALREADY_EXIST",
      });
    }
  }
};
export const updateUser = async () => {
  //create user logic
};
export const getCurrentUser = async (id: string) => {
  const currentUser = authRepository.getUserById(id);
  if (!currentUser) {
    throw new NotFoundError("user not found");
  }
  return currentUser;
};
