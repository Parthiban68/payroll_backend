import z from "zod";

export const BaseDtoSchema = z.object({
  email: z.string()
  .trim()
  .toLowerCase()
  .email("Email format is invalid"),
  password: z.string().min(8),
});

export type BaseDto = z.infer<typeof BaseDtoSchema>;
