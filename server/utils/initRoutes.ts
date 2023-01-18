import {Express} from "express";
import {mongoDbManager} from "./mongoDbManager";
import User from "../models/user";

const initRoutes = (app: Express) => {
    app.get('/users', async ({res}) => {
        const data = await mongoDbManager.getAll(User);
        res?.send(data);
    })
}

export default initRoutes
