import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import initRoutes from "./utils/initRoutes";
import { validateToken } from "./utils/middlewares";
import setUpMongo from './utils/mongoDbManager';


const admin = require("firebase-admin");
dotenv.config();
const { PORT = "" } = process.env;

const cors = require("cors");

const app: Express = express();
app.use(cors());
admin.initializeApp({
  credential: admin.credential.cert({
    type: process.env.FIREBASE_ADMIN_TYPE,
    project_id: process.env.FIREBASE_ADMIN_PROJECT_ID,
    private_key_id: process.env.FIREBASE_ADMIN_PRIVATE_KEY_ID,
    private_key: process.env.FIREBASE_ADMIN_PRIVATE_KEY,
    client_email: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_ADMIN_CLIENT_ID,
    auth_uri: process.env.FIREBASE_ADMIN_AUTH_URI,
    token_uri: process.env.FIREBASE_ADMIN_TOKEN_URI,
    auth_provider_x509_cert_url: process.env.FIREBASE_ADMIN_AUTH_PROVIDER,
    client_x509_cert_url: process.env.FIREBASE_ADMIN_CLIENT_CERT,
  }),
});


app.get("/", validateToken, (req: Request, res: Response) => {
  res.send("WeShop awesome server");
});

setUpMongo();

app.use(validateToken);
initRoutes(app);

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});

