import { z } from "zod";
import { BaseDtoSchema } from "./base.dto";

export const CreateDtoSchema = BaseDtoSchema.extend({
  username: z.string().min(3).max(50),
  mobile_number: z.number().int().positive(),
  role: z.string(),
  country: z.string(),
  state: z.string(),
  city: z.string(),
  pincode: z.number().int(),
});

export type CreateDto = z.infer<typeof CreateDtoSchema>;
