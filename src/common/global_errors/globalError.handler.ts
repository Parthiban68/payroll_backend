import { Request, Response, NextFunction } from "express";
import { envConfig } from "@/config/env.config";
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from "@/core/errors/http.error";
import { logger } from "@/core/logger/logger";

class globalError {
  private readonly isProduction = envConfig.server.enviroment === "production";

  constructo() {}

  handler = (err: Error, req: Request, res: Response, _next: NextFunction) => {
    if (
      err instanceof NotFoundError ||
      err instanceof UnauthorizedError ||
      err instanceof BadRequestError
    ) {
      return res.status(err.statusCode).json({
        success: false,
        message: err.message,
        ...(this.isProduction ? {} : { stack: err.stack }),
      });
    }

    if (this.isProduction) {
      logger.error({
        success: false,
        message: "Something went wrong",
        stack: err.stack,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      ...(this.isProduction ? {} : { stack: err.stack }),
    });
  };
}

export default new globalError();
