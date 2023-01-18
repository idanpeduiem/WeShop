import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import initRoutes from "./utils/initRoutes";

dotenv.config();

const app = express();

const { PORT } = process.env;

app.get("/", (req: Request, res: Response) => {
  res.send("WeShop awesome server");
});

initRoutes(app);

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
