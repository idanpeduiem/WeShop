import { Request, Response, Router } from "express";
import mongoose from "mongoose";
import Order from "../models/order";
import Size from '../models/size';
import Cart from '../models/cart';
import { CartItem } from "../utils/types";

const ordersRouter = Router();

ordersRouter.get('/', async (req:Request, res:Response) => {
    await Size.base;
    const userOrders = await Order.find({userId: req.userId},{lean: true})
    .populate([{path: 'items.item', model: 'item'},{path: 'items.size', model: 'size'}])
    .select(['items','address','createdAt','totalPrice'])
    .lean();

    res.status(200).json(userOrders);
})

ordersRouter.post('/',async (req:Request, res:Response) => {
    const { address } = req.body;
    let totalValue = 0;
    try{
        const cart = await Cart.findOne({uesrId: req.userId})
        .populate([{path: 'items.item', model: 'item'},{path: 'items.size'}])
        .lean()
        .exec();

       if(cart) {
        const items = cart?.items as unknown as CartItem[];
        totalValue = items.reduce((currSum,item) =>  (currSum + (item.item.price) * (item.quantity)),0);
        
        await Order.create({
            userId: req.userId,
            totalPrice: totalValue,
            items: cart.items,
            address
        })
        
        await Cart.updateOne({userId: req.userId, items:[]});
        res.sendStatus(200);
    } else{
        res.sendStatus(404);
    }
    } catch{
        res.sendStatus(500);
    }
})

export default ordersRouter;