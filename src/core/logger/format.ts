import { error, format } from "winston";

const { combine, timestamp, errors, json, printf, colorize } = format;

export const devFormat = combine(
  colorize(),
  timestamp({ format: "HH:mm:ss" }),
  errors({ stack: true }),
  printf(({ level, message, timestamp, stack, ...meta }) => {
    return `${timestamp} ${level}: ${stack || message} ${
      Object.keys(meta).length ? JSON.stringify(meta) : ""
    }`;
  })
);

export const prodFormat = combine(timestamp(), errors({ stack: true }), json());

