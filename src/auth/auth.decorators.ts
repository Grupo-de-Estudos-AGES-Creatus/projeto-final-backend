import { SetMetadata, createParamDecorator, ExecutionContext } from '@nestjs/common';

// @CurrentUser - Decorator para pegar as informações do usuário contidas no token
export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);

// @Public - Decorator para deixar público
export const Public = () => SetMetadata( "isPublic", true );
