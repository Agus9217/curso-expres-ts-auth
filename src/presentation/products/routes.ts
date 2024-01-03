import { Router } from "express";
import { ProductsController } from "./controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { CategoryService } from "../services/category.service";
import { ProductService } from "../services";


export class ProductsRoutes {
  static get routes(): Router {
    const router = Router();
    const productService = new ProductService()
    const controller = new ProductsController(productService);

    // Definir las rutas
    router
      .get("/", controller.getProducts)
      .post("/", [ AuthMiddleware.validateJWT ],controller.createProduct);

    return router;
  }
}
