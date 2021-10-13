import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { AuthService } from '../auth/auth.service';
import {PrismaService} from "../../utilities/collection/prisma.service";

@Injectable()
export class UserEntityService {
  constructor(
    @Inject(forwardRef(() => AuthService)) private authService: AuthService,
    private prismaService: PrismaService,
  ) {
  }

  async findOneByName(name: string): Promise<User> {
    const user = await this.prismaService.user.findUnique({
      where: {
        name,
      },
    });

    return user as unknown as User;

    // if (users !== null && users.length > 0) {
    //   return users[0];
    // }
    // return null;
  }

  async create(data: User | User[]): Promise<User | User[]> {
    const users = data instanceof User ? [data] : data;

    for (let i = 0; i < users.length; i++) {
      users[i].password = this.authService.createPasswordHash(
        users[i].password,
        users[i].name,
      );
    }

    await this.prismaService.user.createMany({
     data: users.map(user => ({
       name: user.name,
       password: user.password,
     })),
    });

    return users;
  }
}
