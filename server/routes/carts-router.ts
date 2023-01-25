import { Request, Response, Router } from "express";
import Cart from "../models/cart";
const x = {
  userId: "9T4RHNlVF4ekLvLXKuv8UOdtqmM2",
  itemId: "63ca9999682b0aa452c43ac5",
  size: "BIG",
};
const cartsRouter = Router();

cartsRouter.post("/addItem", async (req: Request, res: Response) => {
  console.log(req.body);
  const { userId, itemId, size } = req.body;
  const newItem = { itemId, size };

  const item = await Cart.updateOne(
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
