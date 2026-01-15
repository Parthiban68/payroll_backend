import { envConfig } from "@/config/env.config";

export const productionConsoleConfig = () => {
  let emptyConsole = () => {};
  if (envConfig.server.enviroment === "production") {
    console.log = emptyConsole;
  }
};
