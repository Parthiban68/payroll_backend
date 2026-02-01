import { validate } from "./middleware/validate.req";
import { default as globalErrorHandler } from "./global_errors/globalError.handler";
import { commonMiddleware } from "./middleware/common.middleware";

const common = {
  validate,
  globalErrorHandler,
  commonMiddleware,
};

export default common;
