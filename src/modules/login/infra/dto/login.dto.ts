import z from "zod";
import { BaseDtoSchema } from "./base.dto";

export const LoginDtoSchema = BaseDtoSchema.extend({
  mobile_number: z.string().min(10).optional(),
});

export type LoginDto = z.infer<typeof LoginDtoSchema>;
