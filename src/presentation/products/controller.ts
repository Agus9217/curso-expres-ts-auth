import { Request, Response } from "express";
import { CreateCategoryDto, CustomError, PaginationDto } from "../../domain";
import { CategoryService } from "../services/category.service";

export class ProductsController {
  constructor(private readonly categoryService: CategoryService) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).send({ error: error.message });
    }

    console.log(`${error}`);
    return res.status(500).send({ error: "Internal server error" });
  };

  createProduct = (req: Request, res: Response) => {
    // const [error, createCategoryDto] = CreateCategoryDto.create(req.body);

    // if (error) return res.status(400).send({ error });

    // this.categoryService
    //   .createCategory(createCategoryDto!, req.body.user)
    //   .then((category) => res.status(201).send(category))
    //   .catch((err) => this.handleError(err, res));

    res.send('Hola Product')
  };

  getProducts = (req: Request, res: Response) => {
    const { page = 1, limit = 10 } = req.query;
    const [error, paginationDto] = PaginationDto.create(+page, +limit)

    if (error) return res.status(400).send({ error });


    // this.categoryService
    //   .getCategories(paginationDto!)
    //   .then((category) => res.status(200).send(category))
    //   .catch((err) => this.handleError(err, res));


    res.json('Obtengo los productos')
  };
}
