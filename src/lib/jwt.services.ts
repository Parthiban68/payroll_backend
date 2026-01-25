import jwt, { JwtPayload } from "jsonwebtoken";
import * as fs from "node:fs";
import * as path from "node:path";

class jwtService {
  private readonly privateKey: string;
  private readonly publicKey: string;

  constructor() {
    const privateKeyPath = path.join(
      process.cwd(),
      "src",
      "shared",
      "jwtkeys",
      "jwt.private.pem"
    );
    this.privateKey = fs.readFileSync(privateKeyPath, "utf8");

    const publicKeyPath = path.join(
      process.cwd(),
      "src",
      "shared",
      "jwtkeys",
      "jwt.public.pem"
    );

    this.publicKey = fs.readFileSync(publicKeyPath, "utf8");
  }

  generateJwtToken(payload: object): string {
    return jwt.sign(payload, this.privateKey, {
      algorithm: "RS256",
      expiresIn: "1h",
      issuer: "ecommerce",
      audience: "user",
    });
  }

  verifyAccessToken = (token: string) : JwtPayload => {
    return jwt.verify(token, this.publicKey, {
      algorithms: ["RS256"],
    }) as JwtPayload;
  }
}

export const jwtServiceInstance = new jwtService();
