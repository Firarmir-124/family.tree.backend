import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { RequestWithUser } from '../guards/auth.guard';
import { User } from '../../user/entities/user.entity';

export const GetUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): User => {
    const request =
      context.getType() !== 'ws'
        ? context.switchToHttp().getRequest<RequestWithUser>()
        : context.switchToWs().getClient<RequestWithUser>();
    return request.user;
  },
);
