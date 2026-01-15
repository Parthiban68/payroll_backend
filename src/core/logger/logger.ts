import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import { devFormat, prodFormat } from "./format";
import { envConfig } from "@/config/env.config";

const isProd = envConfig.server.enviroment === "production";

const transports: winston.transport[] = [
  new winston.transports.Console({
    level: isProd ? "info" : "debug",
    format: isProd ? prodFormat : devFormat,
  }),
];

if (isProd) {
  transports.push(
    new DailyRotateFile({
      level: "info",
      dirname: "logs/info",
      filename: "app-%DATE%.log",
      datePattern: "YYYY-MM-DD",
      zippedArchive: true,
      maxFiles: "10d",
      maxSize: "20m",
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format((info) => (info.level === "info" ? info : false))(),
        winston.format.json()
      ),
    }),
    new DailyRotateFile({
      level: "error",
      dirname: "logs/error",
      filename: "error-%DATE%.log",
      datePattern: "YYYY-MM-DD",
      zippedArchive: true,
      maxFiles: "30d",
      maxSize: "20m",
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format((info) => (info.level === "error" ? info : false))(),
        winston.format.json()
      ),
    })
  );
}

export const logger = winston.createLogger({
  level: "info",
  transports,
  exitOnError: false,
});
