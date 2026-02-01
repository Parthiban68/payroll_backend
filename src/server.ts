import app from "./app";
import { envConfig } from "./config/env.config";

const port: number = Number(envConfig.server.port) || 4001;

const serverWatch = () => {
  console.info(`Server is up and Running on port : ${port}`);
};

app.listen(port, serverWatch);
