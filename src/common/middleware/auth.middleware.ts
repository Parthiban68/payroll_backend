import { Request, Response, NextFunction } from "express";
import lib from "@/lib";
import { JwtPayload } from "jsonwebtoken";

export interface AuthenticatedRequest extends Request {
  user?: JwtPayload & {
    name?: string;
    email?: string;
    role?: string;
  };
}

export const authenticate = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.cookies?.access_token;
    if (!token) {
      return res.status(204).json({
        success: false,
        message: "Access token missing",
      });
    }

    const decoded = lib.jwtServiceInstance.verifyAccessToken(token);

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired access token",
    });
  }
};
