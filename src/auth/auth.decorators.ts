import { SetMetadata, createParamDecorator, ExecutionContext } from '@nestjs/common';

// ===== @Roles() Decorator =====
export const ROLES_KEY = 'roles';
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);

// ===== @CurrentUser() Decorator =====
export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
