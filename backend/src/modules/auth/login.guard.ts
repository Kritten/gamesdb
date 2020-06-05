import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LoginGuard extends AuthGuard('local') {
  async canActivate(context: ExecutionContext) {
    // return true;
    console.warn('canActivate');
    const request = context.switchToHttp().getRequest();
    console.warn('request');
    const result = (await super.canActivate(context)) as boolean;
    console.warn(result, 'result');
    await super.logIn(request);
    console.warn(result, 'result');
    return result;
  }

  handleRequest(err, user, info) {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }

    return user;
  }
}
