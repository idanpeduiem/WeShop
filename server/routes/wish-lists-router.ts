import { Request, Response, Router } from "express";
import WishList from "../models/wish-list";
import mongoose from "mongoose";

const wishListsRoute = Router();

wishListsRoute.get("/items/", async (req: Request, res: Response) => {
  const userId = req.userId;
  const items = await WishList.aggregate([
    {
      $match: {
        userId,
      },
    },
    {
      $lookup: {
        from: "items",
        localField: "items",
        foreignField: "_id",
        as: "wishlist_items",
      },
    },
    {
      $project: {
        wishlist_items: 1,
      },
    },
  ]).exec();

  res.status(200).json(items[0]?.wishlist_items || []);
});

wishListsRoute.post("/addItem", async (req: Request, res: Response) => {
  let item;

  try {
    const { itemId } = req.body;
    const userId = req.userId;

    item = await WishList.updateOne(
      {
        userId,
      },
      {
        $push: { items: new mongoose.Types.ObjectId(itemId) },
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

wishListsRoute.post("/removeItem", async (req: Request, res: Response) => {
  let item;

  try {
    const { itemId } = req.body;
    const userId = req.userId;

    item = await WishList.updateOne(
      {
        userId,
      },
      {
        $pull: {
          items: new mongoose.Types.ObjectId(itemId),
        },
      }
    );
  } catch (e) {
    res.status(500).send(e);
  }

  res.status(200).json(item);
});

export default wishListsRoute;
