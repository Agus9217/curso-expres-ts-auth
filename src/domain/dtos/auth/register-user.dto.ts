import { regularExps } from "../../../config";

export class RegisterUserDto {
  private constructor(
    public name: string,
    public password: string,
    public email: string
  ) {}

  static create(object: { [key: string]: any }): [string?, RegisterUserDto?] {
    const { name, password, email } = object;

    if (!name) return ["Missing name"];

    if (!email) return ["Missing email"];

    if (!password) return ["Missing password"];

    if (password.length < 6) return ["Password too short"];

    if (!regularExps.email.test(email)) return ["Email is not valid"];

    return [undefined, new RegisterUserDto(name, password, email)];
  }
}
