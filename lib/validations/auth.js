import { z } from "zod"


export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Enter a valid email address'),

  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must be at least 8 characters'),

  keepLoggedIn: z.boolean().optional(),
});

export const registerSchema = z
  .object({
    firstName: z
      .string()
      .min(2, "First name must be at least 2 characters")
      .max(50, "First name must be less than 50 characters"),

    lastName: z
      .string()
      .min(2, "Last name must be at least 2 characters")
      .max(50, "Last name must be less than 50 characters"),

    email: z
      .string()
      .min(1, "Email is required")
      .email("Invalid email address"),

    phone: z
      .string()
      .min(7, "Phone number is too short")
      .max(15, "Phone number is too long")
      .regex(/^\+?[0-9\s\-()]+$/, "Invalid phone number"),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters"),
      // .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      // .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      // .regex(/[0-9]/, "Password must contain at least one number")
      // .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),

    confirmPassword: z
      .string()
      .min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

export const profileSchema = z.object({
  firstName: z
    .string()
    .min(2, "Минимум 2 символа")
    .max(50, "Максимум 50 символов"),
  lastName: z
    .string()
    .min(2, "Минимум 2 символа")
    .max(50, "Максимум 50 символов"),
  email: z
    .string()
    .min(1, "Обязательное поле")
    .email("Неверный формат email"),
  phone: z
    .string()
    .min(7, "Phone number is too short")
    .max(15, "Phone number is too long")
    .regex(/^\+?[0-9\s\-()]+$/, "Invalid phone number"),
})

export const verifyEmailSchema = z.object({
  otp: z.string().min(6, "Please enter the complete verification code").max(6, "Verification code must be 6 digits"),
})
