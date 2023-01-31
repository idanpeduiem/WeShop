import { Request, Response, Router } from "express";
import Cart from "../models/cart";
import mongoose from "mongoose";

const cartsRouter = Router();

cartsRouter.post("/addItem", async (req: Request, res: Response) => {
  let item;

  try {
    const { userId, itemId, size } = req.body;
    const newItem = { itemId: new mongoose.Types.ObjectId(itemId), size };

    item = await Cart.updateOne(
      {
        userId,
      },
      {
        $push: { items: newItem },
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

cartsRouter.post("/removeItem", async (req: Request, res: Response) => {
  let item;

  try {
    const { userId, itemId } = req.body;
    console.log(userId);
    console.log(itemId);
    item = await Cart.updateOne(
      {
        userId,
      },
      {
        $pullAll: {
          items: { itemId: new mongoose.Types.ObjectId(itemId) },
        },
      }
    );
  } catch (e) {
    res.status(500).send(e);
  }

  res.status(200).json(item);
});

cartsRouter.get("/items/:userId", async (req: Request, res: Response) => {
  const { userId } = req.params;
  const item = await Cart.aggregate([
    {
      $match: {
        userId,
      },
    },
    {
      $lookup: {
        from: "items",
        localField: "items.itemId",
        foreignField: "_id",
        as: "cart_items",
      },
    },
    {
      $project: {
        cart_items: 1,
      },
    },
  ]).exec();

  res.status(200).json(item[0]?.cart_items || {});
});

export default cartsRouter;
