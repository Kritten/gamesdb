import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { getManager } from 'typeorm';
import { AuthService } from '../auth/auth.service';
import { EntityService } from '../../utilities/entity/entity.service';

@Injectable()
export class UserService extends EntityService<User> {
  constructor(
    @Inject(forwardRef(() => AuthService)) private authService: AuthService,
  ) {
    super(User);
  }

  async findOneByName(name: string): Promise<User> {
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

  async create(data: User | User[]): Promise<User | User[]> {
    const users = data instanceof User ? [data] : data;

    for (let i = 0; i < users.length; i++) {
      users[i].password = this.authService.createPasswordHash(
        users[i].password,
        users[i].name,
      );
    }

    return await getManager().save(User, users);
  }
}
