import { validate } from "./middleware/validate.req";
import { default as globalErrorHandler } from "./global_errors/globalError.handler";

const common = {
  validate,
  globalErrorHandler,
};

export default common;
