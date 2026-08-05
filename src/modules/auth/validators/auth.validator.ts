import z from "zod";
import { BLOCKED_EMAIL_DOMAINS } from "../../../shared/constants/blockedDomains.js";
import { BLOCKED_PASSWORDS } from "../../../shared/constants/commonPassword.js";
export const createUserSchema = z.object({
  name: z
    .string({ error: "Name is required" })
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must not be more than 100 characters")
    .regex(/^[A-Za-z]+(?:[ '-][A-Za-z]+)*$/, "Name contains invalid characters"),
  email: z
    .string({ error: "Email is required" })
    .trim()
    .toLowerCase()
    .check(z.email("Invalid email format"))
    .refine(
      (email) => !BLOCKED_EMAIL_DOMAINS.includes(email.split("@")[1] ?? ""),
      "Email domain not allowed",
    ),
  password: z
    .string({ error: "Password is required" })
    .min(8, "Password must be at least 8 characters")
    .max(30, "Password must not be more than 30 characters")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/\d/, "Password must contain at least one number")
    .regex(/[\W_]/, "Password must contain at least one special character")
    .refine((val) => !BLOCKED_PASSWORDS.includes(val), "Password is too common"),
  phone: z.string().min(10).max(20).optional(),
});
export const updateUserSchema = z.object({
  name: z
    .string({ error: "Name is required" })
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must not be more than 100 characters")
    .regex(/^[A-Za-z]+(?:[ '-][A-Za-z]+)*$/, "Name contains invalid characters")
    .optional(),
  email: z
    .string({ error: "Email is required" })
    .trim()
    .toLowerCase()
    .check(z.email("Invalid email format"))
    .refine(
      (email) => !BLOCKED_EMAIL_DOMAINS.includes(email.split("@")[1] ?? ""),
      "Email domain not allowed",
    )
    .optional(),
  password: z
    .string({ error: "Password is required" })
    .min(8, "Password must be at least 8 characters")
    .max(30, "Password must not be more than 30 characters")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/\d/, "Password must contain at least one number")
    .regex(/[\W_]/, "Password must contain at least one special character")
    .refine((val) => !BLOCKED_PASSWORDS.includes(val), "Password is too common")
    .optional(),
  phone: z.string().min(10).max(20).optional(),
});
export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
