import jwt from "jsonwebtoken";
import { envs } from "./envs";

export class JwtAdapter {
  private static JWT_SEED = envs.JWT_SEED;

  static async generateToken(payload: any, duration: string = "2h") {
    return new Promise((resolve) => {
      jwt.sign(
        payload,
        this.JWT_SEED,
        { expiresIn: duration },
        (err, token) => {
          if (err) return resolve(null);
          resolve(token);
        }
      );
    });
  }

  static validateToken(token: string) {
    return new Promise((resolve) => {
      jwt.verify(token, this.JWT_SEED, (err, decoded) => {
        if (err) return resolve(null);
        resolve(decoded);
      });
    });
  }
}
