import { Request, Response } from "express";
import { CustomError } from "../../domain";
import { FileUploadService } from "../services/file-upload.service";
import { UploadedFile } from "express-fileupload";

export class FileUploadController {
  constructor(
    private fileUploadService: FileUploadService
  ) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).send({ error: error.message });
    }

    console.log(`${error}`);
    return res.status(500).send({ error: "Internal server error" });
  };




  uploadFile = (req: Request, res: Response) => {
    const files = req.files

    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send({ error: 'No files were selected' });
       
    }


    const file = req.files.file

    this.fileUploadService.uploadSingle(file as UploadedFile)
    .then(uploaded => res.send(uploaded))
    .catch(err => this.handleError(err, res))



  };







  uploadMultipleFiles = (req: Request, res: Response) => {
    res.send("Uploading MultipleFiles");
  };
}
