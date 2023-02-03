import { Request, Response, Router } from "express";
import mongoose from "mongoose";
import Item from "../models/item";

const ITEMS_PER_PAGE = 8;

const itemsRoute = Router();

itemsRoute.get("/", async (req: Request, res: Response) => {
  try {
    const page: number = parseInt(req.query.page as string);
    const items = await Item.find({})
      .populate('category')
      .populate('department')
      .limit(ITEMS_PER_PAGE)
      .skip(ITEMS_PER_PAGE * page)
      .lean();
    
    res.status(200).json(items);
  } catch (error) {
    res.status(500).send(error);
  }
});

itemsRoute.get("/numOfPages", async(req: Request, res:Response) => {
  try {
    const totalCount: number = await Item.countDocuments({});
    const numOfPages: number = Math.ceil(totalCount / ITEMS_PER_PAGE);
    res.status(200).json(numOfPages);
  } catch (error) {
    res.status(500).send(error);
  }
})


itemsRoute.get("/desc", async (req: Request, res: Response) => {
  const items = await Item.find({}, { _id: 1, description: 1 });

  try {
    res.send(items);
  } catch (error) {
    res.status(500).send(error);
  }
});
itemsRoute.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const item = await Item.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(id),
      },
    },
    {
      $lookup: {
        from: "item-stocks",
        localField: "_id",
        foreignField: "item",
        as: "stock",
        pipeline: [
          {
            $lookup: {
              from: "sizes",
              localField: "size",
              foreignField: "_id",
              as: "size",
            },
          },
        ],
      },
    },
    {
      $lookup: {
        from: "departments",
        localField: "department",
        foreignField: "_id",
        as: "department",
      },
    },
    {
      $lookup: {
        from: "item-categories",
        localField: "category",
        foreignField: "_id",
        as: "category",
      },
    },
    {
      $project: {
        department: { $arrayElemAt: ["$department", 0] },
        category: { $arrayElemAt: ["$category", 0] },
        price: 1,
        description: 1,
        image: 1,
        stock: 1,
      },
    },
  ]).exec();

  if (!item.length) {
    res.status(404).json({ message: "Item not found" });
  }

  res.status(200).json(item[0]);
});

export default itemsRoute;
