import { validate } from "./validate.req";
import { authenticate } from "./auth.middleware";

export const commonMiddleware = (schema: any) => {
  return [validate(schema), authenticate];
};
