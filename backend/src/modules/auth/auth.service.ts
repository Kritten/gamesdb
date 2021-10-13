import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UserEntityService } from '../user/user.entity.service';
import { User } from '../user/user.entity';
import { createHash } from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserEntityService))
    private userService: UserEntityService,
  ) {}

  async validateUser(username: string, password: string): Promise<User> {
    const user = await this.userService.findOneByName(username);

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
