import { Request, Response, Router } from "express";
import mongoose from "mongoose";
import Order from "../models/order";
import Size from '../models/size';
import Cart from '../models/cart';

const ordersRouter = Router();

ordersRouter.get('/', async (req:Request, res:Response) => {
      Size.base;
     Cart.base;
    const userOrders = await Order.find({userId: 'BvKFf5Fc8KUcnEh63DJ19NqHVkh2'},{lean: true})
    .populate({path: 'cart', model: 'cart',
     populate: [{path: 'items.itemId', model: 'item'},{path: 'items.size'}]})
    .lean();

    res.status(200).json(userOrders);
})

export default ordersRouter;