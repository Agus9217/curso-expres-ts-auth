import { BcryptAdapter } from "../../config";
import { UserModel } from "../../config/data";
import { CustomError, LoginUserDto, RegisterUserDto, UserEntity } from "../../domain";

export class AuthService {
  constructor() {}

  public async registerUser(registerUserDto: RegisterUserDto) {
    const existUser = await UserModel.findOne({ email: registerUserDto.email });
    if (existUser) throw CustomError.badRequest("Email already exist");

    try {
      const user = new UserModel(registerUserDto);

      user.password = BcryptAdapter.hash(registerUserDto.password);

      await user.save();

      const { password, ...userEntity } = UserEntity.fromObject(user);

      return {
        user: userEntity,
        token: "ABC",
      };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  public async loginUser(loginUserDto: LoginUserDto) {
    const user = await UserModel.findOne({ email: loginUserDto.email });
    if(!user) throw CustomError.badRequest('Something is wrong')

    const isMatching = BcryptAdapter.compare(loginUserDto.password, user.password)
    
    if(!isMatching) throw CustomError.badRequest('Something is wrong')


    const { password, ...userEntity } = UserEntity.fromObject(user)

    return {
      user: userEntity,
      token: 'ABC'
    }

  }
}
