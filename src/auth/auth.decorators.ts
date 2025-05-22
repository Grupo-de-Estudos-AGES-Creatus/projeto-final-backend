import { SetMetadata, createParamDecorator, ExecutionContext } from '@nestjs/common';

// ===== @CurrentUser() Decorator =====
export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);

// @Public() Decorator
export const Public = () => SetMetadata( "isPublic", true );
