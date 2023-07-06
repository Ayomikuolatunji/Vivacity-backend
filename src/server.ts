import bodyParser from "body-parser";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import compression from "compression";
import requestHeaders from "./middleware/requestHeaders";
import { handleServerError } from "./middleware/requestErrorHandler";
import v1ApiRouter from "./services/v1Api";
import prisma from "./database/database";
import { PrismaClient } from "@prisma/client";
import { pageNotFound } from "./middleware/404Page";

const port = process.env.PORT || 8080;

dotenv.config();
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({ credentials: true, origin: "*" }));

app.options("*", cors());

app.use(compression());

app.use(requestHeaders);

// version apis
app.use("/api", v1ApiRouter);

app.use(pageNotFound);
app.use(handleServerError);

class CreateDBConnect {
  db: PrismaClient;
  constructor() {
    this.db = prisma;
  }
  async connect() {
    try {
      await this.db.$connect();
      console.log("Connected to database successfully");
       app.listen(port, () =>
        console.log(`Server started on port ${port}`)
      );
    } catch (error: any) {
      console.error("Failed to connect to database", error.message);
    }
  }
  async disconnect() {
    await this.db.$disconnect();
  }
}
const dbConnect = new CreateDBConnect();
dbConnect.connect();
