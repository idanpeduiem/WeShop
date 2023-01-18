import { Express } from "express";
import { mongoDbManager } from "./mongoDbManager";
import User from "../models/user";
import { validateToken } from "./middlewares";
// Add here routes to make all routes uniq
enum routes {
  ALL_USERS = "/users",
}

const initRoutes = (app: Express) => {
  app.get(routes.ALL_USERS, validateToken, async ({ res }) => {
    const data = await mongoDbManager.getAll(User);
    res?.send(data);
  });
};

export default initRoutes;
