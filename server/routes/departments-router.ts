import { Request, Response, Router } from "express";
import Department from "../models/department";

const departmentsRouter = Router();

departmentsRouter.get('/', async (req: Request,res: Response) => {
  const departments = await Department.find({});

  try {
    res.send(departments);
  } catch (error) {
    res.status(500).send(error);
  }
})

export default departmentsRouter;