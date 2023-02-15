import { Request, Response, Router } from "express";
import Cart from "../models/cart";
import mongoose from "mongoose";
import { CartItem } from "../utils/types";

const cartsRouter = Router();
cartsRouter.post("/addItem", async (req: Request, res: Response) => {
  let item;

  try {
    const { item: itemToAdd, size, quantity } = req.body;
    const cart = await Cart.findOne({
      userId: req.userId,
      "items.item": itemToAdd._id,
      "items.size": size,
    })
      .populate("items.item")
      .lean();
    const cartItem = cart?.items.find(
      (item) =>
        item.item._id.toString() === itemToAdd._id &&
        item.size.toString() === size._id
    );

    if (cartItem) {
      await Cart.updateOne(
        {
          userId: req.userId,
          "items.item": itemToAdd._id,
          "items.size": size._id,
        },
        {
          $set: {
            "items.$.quantity": quantity + cartItem.quantity,
          },
        }
      );
    } else {
      const newItem = {
        item: new mongoose.Types.ObjectId(itemToAdd._id),
        size,
        quantity,
      };

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
    }
  } catch (e) {
    res.status(500).send(e);
  }

  res.status(200).json(item);
});

cartsRouter.post("/removeItem", async (req: Request, res: Response) => {
  let item;

  try {
    const { itemId, sizeId } = req.body;
    const userId = req.userId;

    item = await Cart.updateOne(
      {
        userId,
      },
      {
        $pull: {
          items: {
            item: new mongoose.Types.ObjectId(itemId),
            size: new mongoose.Types.ObjectId(sizeId),
          },
        },
      }
    );
  } catch (e) {
    res.status(500).send(e);
  }

  res.status(200).json(item);
});

cartsRouter.get("/items/", async (req: Request, res: Response) => {
  let totalValue = 0;
  const cart = await Cart.findOne({ userId: req.userId })
    .populate([{ path: "items.item" }, { path: "items.size" }])
    .lean()
    .exec();

  if (cart) {
    const items = cart?.items as unknown as CartItem[];
    totalValue = items.reduce(
      (currSum, item) => currSum + item.item.price * item.quantity,
      0
    );
    totalValue = Number(totalValue.toFixed(2));
  }

  res.status(200).json({ items: cart?.items || [], value: totalValue });
});

export default cartsRouter;
