import { Request, Response, Router } from "express";
import mongoose from "mongoose";
import Order from "../models/order";
import Size from '../models/size';
import Cart from '../models/cart';

const ordersRouter = Router();

ordersRouter.get('/', async (req:Request, res:Response) => {
    await Size.base;
    const userOrders = await Order.find({userId: req.userId},{lean: true})
    .populate([{path: 'items.item', model: 'item'},{path: 'items.size', model: 'size'}])
    .select(['items','address','createdAt','totalPrice'])
    .lean();

    res.status(200).json(userOrders);
})

export default ordersRouter;