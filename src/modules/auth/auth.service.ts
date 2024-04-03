import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { TokenService } from '../token/token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
  ) {}

  async registerUser(createUserDto: CreateUserDto) {
    try {
      const isExistUser = await this.userService.findUserByEmail(
        createUserDto.email,
      );
      if (isExistUser) throw new BadRequestException('User already exist');
      return this.userService.createUser(createUserDto);
    } catch (e) {
      throw new Error(e);
    }
  }

  async loginUser(loginDto: LoginDto) {
    try {
      const isExistUser = await this.userService.findUserByEmail(
        loginDto.email,
      );
      if (!isExistUser) throw new BadRequestException('User not exist');
      const validatePassword = await bcrypt.compare(
        loginDto.password,
        isExistUser.password,
      );
      if (!validatePassword) throw new BadRequestException('Wrong data');
      const user = await this.userService.publicUser(loginDto.email);
      const token = await this.tokenService.generateJwtToken(user);
      return { user, token };
    } catch (e) {
      throw new Error(e);
    }
  }
}
