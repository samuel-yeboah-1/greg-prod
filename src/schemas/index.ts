import { z } from 'zod';

const signupSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }).max(50, { message: "First name must be at most 50 characters long" }),
  lastName: z.string().min(1, { message: "Last name is required" }).max(50, { message: "Last name must be at most 50 characters long" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters long" })
    .max(100)
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
      message: "Enter a strong password"
    }),
  confirmPassword: z.string().min(8).max(100)
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

const signinSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters long" })
})

export {signinSchema, signupSchema};