import mongoose from "mongoose";
import { envConfig } from "./env.config";

class connectDB {
  constructor(private readonly mongoDB = mongoose) {}

  async connect() {
    try {
      this.mongoDB.connect(envConfig.database.db_url as string);

      this.mongoDB.connection.on("connected", () => {
        console.log("Database connected");
      });
    } catch (error) {
      console.error("MongoDB connection failed", error);
      process.exit(1);
    }
  }
}

export default new connectDB();

