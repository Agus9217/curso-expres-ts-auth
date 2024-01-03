import { Router } from "express";
import { ProductsController } from "./controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { CategoryService } from "../services/category.service";

export class ProductsRoutes {
  static get routes(): Router {
    const router = Router();
    const categoryService = new CategoryService()
    const controller = new ProductsController(categoryService);

    // Definir las rutas
    router
      .get("/", controller.getProducts)
      .post("/", [ AuthMiddleware.validateJWT ],controller.createProduct);

    return router;
  }
}
