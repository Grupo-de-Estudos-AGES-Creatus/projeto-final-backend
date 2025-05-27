import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';
import { Role } from './roles.enum';
import { JwtPayload } from '../auth-payload.interface';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // Se a rota não tem role permite seu uso
    if (!requiredRoles) {
      return true; 
    }

    // Pega as informações do token
    const { user } = context.switchToHttp().getRequest();
    const currentUser: JwtPayload = user;

    // Se o as informações do token não existir ou o cargo não existir, retorna erro
    if (!currentUser || !currentUser.role) {
      throw new ForbiddenException('Acesso negado: informações de role ausentes ou usuário não autenticado.');
    }

    // Verifica se o cargo do usuário é permitido)
    const hasPermission = requiredRoles.includes(currentUser.role);

    // Se não tiver permissão retorna um erro 
    if (!hasPermission) {
      throw new ForbiddenException('Acesso negado: você não tem as permissões necessárias.');
    }

    // Permite o uso da rota
    return true;
  }
}