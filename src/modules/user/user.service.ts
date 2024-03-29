import { Injectable } from '@nestjs/common';
import { users } from 'src/moks';

@Injectable()
export class UserService {
  async getUsers() {
    return users;
  }
}
