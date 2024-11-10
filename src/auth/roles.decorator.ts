import { SetMetadata } from '@nestjs/common';

// (chatGPT) Define a metadata 'roles' nas rotas, que será acessada pelo AuthGuard
export const Roles = (...roles: string[]) => SetMetadata('roles', roles);