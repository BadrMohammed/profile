import { z } from "zod";
export const validationSchema = (isEdit: boolean) => {
  return z.object({
    fullName: z.string().min(1, "Full name is required").max(20),
    phoneNumber: z.string().min(10, "Phone number is required").max(14),
    jobType: z.string().min(1, "Job type is required"),
    email: z.string().min(1, "Email is required").email({
      message: "Must be a valid email",
    }),
    password: isEdit
      ? z.any()
      : z
          .string()
          .min(9, { message: "Password must be at least 6 characters" })
          .max(20),
    terms: isEdit
      ? z.any()
      : z.literal(true, {
          errorMap: () => ({ message: "You must accept Terms and Conditions" }),
        }),
  });
};
