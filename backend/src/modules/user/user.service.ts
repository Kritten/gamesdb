import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { getManager, Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor() {}

  async findbyName(name: string): Promise<User> {
    const users = await getManager().find(User, {
      where: {
        name,
      },
    });
    if (users !== null && users.length > 0) {
      return users[0];
    }
    return null;
  }

  async createUser(data: User | User[]) {
    return await getManager().insert(User, data);
  }
}
