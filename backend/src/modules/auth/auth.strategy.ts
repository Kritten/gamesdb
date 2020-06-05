import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '../user/user.entity';

@Injectable()
export class AuthStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<User> {
    console.warn(username, password, 'username');
    const user = await this.authService.validateUser(username, password);
    console.warn(user, 'user');
    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
