import { Request, Response, Router } from "express";
import Cart from "../models/cart";
import mongoose from "mongoose";

const cartsRouter = Router();

cartsRouter.post("/addItem", async (req: Request, res: Response) => {
  let item;

  try {
    const { userId, itemId, size, quantity } = req.body;
    const newItem = { item: new mongoose.Types.ObjectId(itemId), size, quantity };

    item = await Cart.updateOne(
      {
        userId,
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
  const cart = await Cart.find({uesrId: req.userId})
  .populate([{path: 'items.item'},{path: 'items.size'}])
  .populate([{path:'items.item.category'},{path:'items.item.department'}])
  .lean()
  .exec();

  res.status(200).json(cart[0].items);
});

export default cartsRouter;
