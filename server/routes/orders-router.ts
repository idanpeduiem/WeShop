import { Request, Response, Router } from "express";
import mongoose from "mongoose";
import Order from "../models/order";
import Size from '../models/size';
import Cart from '../models/cart';
import { CartItem } from "../utils/types";
import ItemStock from "../models/item-stock";


const ordersRouter = Router();

const updateItemsStock = async (cartItem: CartItem) => {
        const itemStock = await ItemStock.findOne({
             item: cartItem.item._id,
             size: cartItem.size._id
         })
         .exec()
         
         if(!itemStock){
            throw new Error(`Something went wrong with finding item stock`);
         }

         if(itemStock.quantity < cartItem.quantity){
            throw new Error(`only ${itemStock?.quantity} left in ${cartItem.item.description}`)
         }

        await ItemStock.updateOne({_id: itemStock._id},
            {quantity: itemStock.quantity - cartItem.quantity})
}

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
    const cart = await Cart.findOne({userId: req.userId})
    .populate([{path: 'items.item', model: 'item'},{path: 'items.size'}])
    .lean()
    .exec();
    
    if(cart) {
        const items = cart.items as unknown as CartItem[];
        totalValue = items.reduce((currSum,item) =>  (currSum + (item.item.price) * (item.quantity)),0);
        
        const session = await mongoose.startSession();
        
    try{
        await session.withTransaction(async () => {
           await Promise.all(items.map(item => updateItemsStock(item)))
           await Order.create({
                userId: req.userId,
                totalPrice: totalValue,
                items: cart.items,
                address
            })
             await Cart.deleteOne({userId: req.userId});
        })
        
        res.sendStatus(200);
    } catch(error: any){
        res.status(500).json({errMessage: error.message});
    }
    } else {
        res.sendStatus(404);
    }
})

export default ordersRouter;