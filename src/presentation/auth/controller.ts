import e, { Request, Response } from "express";
import { CustomError, LoginUserDto, RegisterUserDto } from "../../domain";
import { AuthService } from "../services/auth.service";

export class AuthController {
  constructor(private authService: AuthService) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).send({ error: error.message });
    }

    console.log(`${error}`);
    return res.status(500).send({ error: "Internal server error" });
  };

  registerUser = (req: Request, res: Response) => {
    const { body } = req;

    const [error, registerDto] = RegisterUserDto.create(body);

    if (error) return res.status(400).send({ error });

    this.authService
      .registerUser(registerDto!)
      .then((user) => res.send(user))
      .catch((err) => this.handleError(err, res));
  };

  loginUser = (req: Request, res: Response) => {
    const { body } = req;

    const [error, loginDto] = LoginUserDto.login(body);

    if (error) return res.status(400).send({ error });

    this.authService
      .loginUser(loginDto!)
      .then((user) => res.send(user))
      .catch((err) => this.handleError(err, res));
  };

  validateEmail = (req: Request, res: Response) => {
    const { token } = req.params;
    this.authService
      .validateEmail(token)
      .then(() => res.send("Email was validated properly"))
      .catch((err) => this.handleError(err, res));
  };
}
