import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { userInfo } from 'os';
import { UserEntity } from '../../user/entities/user.entity';

export const GetUser = createParamDecorator(
  (data, ctx: ExecutionContext): UserEntity => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  }
);
