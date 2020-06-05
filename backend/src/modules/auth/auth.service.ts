import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';
import { createHash } from 'crypto';
import { getManager } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async validateUser(username: string, password: string): Promise<User> {
    const user = await this.userService.findbyName(username);

    // if (user === null) {
    //   await this.userService.createUser(
    //     getManager().create(User, {
    //       name: 'test1',
    //       password: 'testt',
    //     }),
    //   );
    // }

    // if (user && user.name === password) {
    // const { ...result } = user;
    // return result;
    // }
    if (user !== null) {
      const verified =
        user.password === this.createPasswordHash(password, username);
      console.warn(verified, 'verified');
      if (verified) {
        delete user.password;
        return user;
      }
    }

    return null;
  }

  public createPasswordHash(password: string, salt: string): string {
    return createHash('sha256')
      .update(password)
      .update(salt)
      .digest('hex');
  }
}
