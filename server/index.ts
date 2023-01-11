import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

const {PORT, DB_CONNECTION_STR = ''} = process.env;

mongoose.connect(DB_CONNECTION_STR);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

app.get('/',async (req: Request, res: Response) => {
  res.send('WeShop awesome server');
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});