import fs from "fs";
import path from "path";
import { Request, Response } from "express";

export class ImageController {
  constructor() {}

  static getImage(req: Request, res: Response) {
    const { type = "", img = "" } = req.params;

    const imgagePath = path.resolve(
      __dirname,
      `../../../uploads/${type}/${img}`
    );
    if (!fs.existsSync(imgagePath))
      return res.status(404).send("Image not found");

    res.sendFile(imgagePath);
  }
}
