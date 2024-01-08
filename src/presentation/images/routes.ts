import { Router } from "express";
import { ImageController } from "./controller";

export class ImagesRoutes {
  static get routes(): Router {
    const router = Router();

    router.get("/:type/:img", ImageController.getImage);

    return router;
  }
}
