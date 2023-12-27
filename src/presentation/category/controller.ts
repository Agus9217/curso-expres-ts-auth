import { Response } from "express";
import { CustomError } from "../../domain";

export class CategoryController {
  constructor() {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).send({ error: error.message });
    }

    console.log(`${error}`);
    return res.status(500).send({ error: "Internal server error" });
  };

  createCategory = async (req: Request, res: Response) => {
    res.send('create category')
  };

  getCategories = async (req: Request, res: Response) => {
    res.send('get category')
  };
}
