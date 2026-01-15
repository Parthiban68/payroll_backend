import { Request, Response, NextFunction } from "express";
import { userRepository } from "../../application/repositories/user.repository";
import { userService } from "../../application/service/user.services";
import lib from "@/lib";
import { envConfig } from "@/config/env.config";

class userController {
  private readonly service: userService;
  constructor() {
    const useRepo = new userRepository();
    this.service = new userService(
      useRepo,
      lib.jwtServiceInstance,
      lib.mailServiceInstance
    );
    this.userRegister = this.userRegister.bind(this);
    this.userLogin = this.userLogin.bind(this);
  }
  async userRegister(req: Request, res: Response, next: NextFunction) {
    try {
      return res.status(200).json({
        message: "user Created successfully",
        result: await this.service.registerUser(req.body),
      });
    } catch (error) {
      next(error);
    }
  }

  async userLogin(req: Request, res: Response, next: NextFunction) {
    try {
      const { token, user } = await this.service.userLogin(req.body);

      res.cookie("access_token", token, {
        httpOnly: true,
        secure: envConfig.server.enviroment === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 1000,
        path: "/",
      });

      return res.status(200).json({
        message: "Login successfull",
        result: {
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async userLogout(req: Request, res: Response, next: NextFunction) {
    try {
      res.clearCookie("access_token", {
        httpOnly: true,
        secure: envConfig.server.enviroment === "production",
        sameSite: "lax",
        path: "/",
      });

      return res.status(200).json({
        success : true,
        message: "Logged out successfully",
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new userController();
