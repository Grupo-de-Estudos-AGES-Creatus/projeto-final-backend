import { SetMetadata } from '@nestjs/common';
import { Role } from './roles.enum';

// @Roles - Decorator para permitir somente um certo cargo acesso as rotas
export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);