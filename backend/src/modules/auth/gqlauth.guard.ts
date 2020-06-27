import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class GqlAuthGuard extends AuthGuard('local') {
  getRequest(context: ExecutionContext) {
    // console.warn(context, 'context');
    const ctx = GqlExecutionContext.create(context);
    console.warn(
      ctx.getContext().req.isAuthenticated(),
      'ctx.getContext().req',
    );
    return ctx.getContext().req;
  }

  canActivate(context: ExecutionContext) {
    return this.getRequest(context).isAuthenticated();
    // const request = context.switchToHttp().getRequest();
    // return GqlExecutionContext.create(context).isAuthenticated();
  }
}
