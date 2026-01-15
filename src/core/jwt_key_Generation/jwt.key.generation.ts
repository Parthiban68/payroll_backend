import { generateKeyPairSync } from "crypto";
import * as fs from "node:fs";
import * as path from "node:path";

const keyDir = path.join(process.cwd(), "..", "..", "shared", "jwtkeys");

if (!fs.existsSync(keyDir)) {
  fs.mkdirSync(keyDir, { recursive: true });
}

const { publicKey, privateKey } = generateKeyPairSync("rsa", {
  modulusLength: 2048,
  publicKeyEncoding: {
    type: "spki",
    format: "pem",
  },
  privateKeyEncoding: {
    type: "pkcs8",
    format: "pem",
  },
});

fs.writeFileSync(path.join(keyDir, "jwt.private.pem"), privateKey);
fs.writeFileSync(path.join(keyDir, "jwt.public.pem"), publicKey);

console.log("RSA keys created");
