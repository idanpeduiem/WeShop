import { Request, Response, Router } from "express";
import ItemCategory from "../models/item-category";

const categoriesRouter = Router();

categoriesRouter.get('/', async (req: Request, res: Response) => {
  const categories = await ItemCategory.find({});

  try {
    res.send(categories);
  } catch (error) {
    res.status(500).send(error);
  }
})

export default categoriesRouter;