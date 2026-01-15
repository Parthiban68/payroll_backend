import { z } from "zod";
import { CreateDtoSchema } from "./create.dto";

export const UpdateSchema = CreateDtoSchema.extend({});

export type UpdateDto = z.infer<typeof UpdateSchema>;
