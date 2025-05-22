// src/auth/roles.guard.ts
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

    if (!requiredRoles) {
      return true; // Se a rota não especificou roles, permite o acesso (ajuste se a regra for diferente)
    }

    const { user } = context.switchToHttp().getRequest();

    // O 'user' aqui é o objeto retornado pela JwtStrategy (JwtPayload)
    const currentUser: JwtPayload = user;

    if (!currentUser || !currentUser.role) {
      throw new ForbiddenException('Acesso negado: informações de role ausentes ou usuário não autenticado.');
    }

    // Verifica se a role do usuário (singular) está incluída nas roles requeridas (array)
    const hasPermission = requiredRoles.includes(currentUser.role);

    if (!hasPermission) {
      throw new ForbiddenException('Acesso negado: você não tem as permissões necessárias.');
    }

    return true;
  }
}