
import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { JwtService } from '@nestjs/jwt';
  import { jwtConstants } from './constants';
  import { Request } from 'express';
  
  @Injectable()
  export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      const token = this.extractTokenFromHeader(request);
      if (!token) {
        throw new UnauthorizedException({
          message: 'erro na extração do token',
        });;
      }
      try {
        const payload = await this.jwtService.verifyAsync(
          token,
          {
            secret: jwtConstants.secret
          }
        );
        // 💡 We're assigning the payload to the request object here
        // so that we can access it in our route handlers
        request['user'] = payload;
        const requiredRoles = this.getRequiredRoles(context);
      if (requiredRoles && !requiredRoles.includes(payload.role)) {
        throw new UnauthorizedException({messege:'Você não tem permissão para acessar esta rota'});
      }
      } catch {
        throw new UnauthorizedException({messege:'erro no token'});
      }
      return true;
    }
  
    private extractTokenFromHeader(request: Request): string | undefined {
      const [type, token] = request.headers.authorization?.split(' ') ?? [];
      return type === 'Bearer' ? token : undefined;
    }
  
    // (chatGPT) Função para obter as roles requeridas na rota, caso existam
    private getRequiredRoles(context: ExecutionContext): string[] {
      const handler = context.getHandler();
      return Reflect.getMetadata('roles', handler); // Obtém a metadata da rota (caso tenha sido definida com o @Roles)
    }
  }
  