import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private readonly userRepository: typeof User,
  ) {}

  async publicUser(email: string) {
    return await this.userRepository.findOne({
      where: { email },
      attributes: { exclude: ['password'] },
    });
  }

  async updateUser(email: string, updateUserDto: UpdateUserDto) {
    await this.userRepository.update(updateUserDto, { where: { email } });
    return updateUserDto;
  }

  async deleteUser(email: string) {
    await this.userRepository.destroy({ where: { email } });
    return true;
  }

  async findUserByEmail(email: string) {
    return await this.userRepository.findOne({ where: { email } });
  }

  async hashPassword(password: string) {
    return bcrypt.hash(password, 7);
  }

  async createUser(createUserDto: CreateUserDto) {
    createUserDto.password = await this.hashPassword(createUserDto.password);
    await this.userRepository.create({
      firstname: createUserDto.firstname,
      username: createUserDto.username,
      email: createUserDto.email,
      password: createUserDto.password,
    });
    return createUserDto;
  }
}
