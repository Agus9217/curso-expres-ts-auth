import { Request, Response } from "express";
import { CreateProductDto, CustomError, PaginationDto } from "../../domain";
import { ProductService } from "../services";

export class ProductsController {
  constructor(private readonly productService: ProductService) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).send({ error: error.message });
    }

    console.log(`${error}`);
    return res.status(500).send({ error: "Internal server error" });
  };

  createProduct = (req: Request, res: Response) => {
    const [error, createProductDto] = CreateProductDto.create({
      ...req.body,
      user: req.body.user.id,
    });

    if (error) return res.status(400).send({ error });

    this.productService
      .createProduct(createProductDto!)
      .then((product) => res.status(201).send(product))
      .catch((err) => this.handleError(err, res));
  };

  getProducts = (req: Request, res: Response) => {
    const { page = 1, limit = 10 } = req.query;
    const [error, paginationDto] = PaginationDto.create(+page, +limit);

    if (error) return res.status(400).send({ error });

    this.productService
      .getProducts(paginationDto!)
      .then((product) => res.status(200).send(product))
      .catch((err) => this.handleError(err, res));
  };
}
