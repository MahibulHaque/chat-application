import { z } from "zod";

export const userSignInValidator = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6)
    .regex(new RegExp(/^(?=.*\d)(?=.*[A-Z])(?=.*[^A-Za-z0-9]).*$/)),
});
