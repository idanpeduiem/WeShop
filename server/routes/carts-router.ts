import { Request, Response, Router } from "express";
import Cart from "../models/cart";
import mongoose from "mongoose";
import { CartItem } from "../utils/types";

const cartsRouter = Router();
cartsRouter.post("/addItem", async (req: Request, res: Response) => {
  let item;
 
  try {
    const { item: itemToAdd, size, quantity } = req.body;
    const newItem = { item: new mongoose.Types.ObjectId(itemToAdd._id), size, quantity };

    item = await Cart.updateOne(
      {
        userId: req.userId,
      },
      {
        $push: { items: newItem, quantity, size },
      },
      {
        upsert: true,
      }
    );
  } catch (e) {
    res.status(500).send(e);
  }

  res.status(200).json(item);
});

cartsRouter.get("/items/:userId", async (req: Request, res: Response) => {
  let totalValue = 0;
  const cart = await Cart.findOne({uesrId: req.userId})
  .populate([{path: 'items.item', model: 'item'},{path: 'items.size'}])
  .lean()
  .exec();

  if(cart) {
    const items = cart?.items as unknown as CartItem[];
    totalValue = items.reduce((currSum,item) =>  (currSum + (item.item.price) * (item.quantity)),0);
  }
  

  res.status(200).json({items: cart?.items || {}, value: totalValue});
});


export default cartsRouter;
