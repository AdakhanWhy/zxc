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
    const isExistUser = await this.userService.findUserByEmail(
      createUserDto.email,
    );
    if (isExistUser) throw new BadRequestException('User already exist');
    return this.userService.createUser(createUserDto);
  }

  async loginUser(loginDto: LoginDto) {
    const isExistUser = await this.userService.findUserByEmail(loginDto.email);
    if (!isExistUser) throw new BadRequestException('User not exist');
    const validatePassword = await bcrypt.compare(
      loginDto.password,
      isExistUser.password,
    );
    if (!validatePassword) throw new BadRequestException('Wrong data');
    const userData = {
      name: isExistUser.firstname,
      email: isExistUser.email,
    };
    const token = await this.tokenService.generateJwtToken(userData);
    const user = await this.userService.publicUser(loginDto.email);
    return { ...user, token };
  }
}
