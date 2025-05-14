import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { JsonWebTokenError, JwtService, NotBeforeError,TokenExpiredError } from '@nestjs/jwt';
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
        console.log("CHEGOU 1 ")
        const payload = await this.jwtService.verifyAsync(
          token
        );
        console.log("CHEGOU 2 ")
        // 💡 We're assigning the payload to the request object here
        // so that we can access it in our route handlers
        request['user'] = payload;
        console.log("CHEGOU 3 ")
        const requiredRoles = this.getRequiredRoles(context);
        console.log("CHEGOU 4 ")
      if (requiredRoles && !requiredRoles.includes(payload.role)) {
        throw new UnauthorizedException({messege:'Você não tem permissão para acessar esta rota'});
      }
      } catch(error) {
        if (error instanceof TokenExpiredError) {
          throw new UnauthorizedException('Token expirado');
        }
        if (error instanceof JsonWebTokenError) {
          throw new UnauthorizedException('Token inválido');
        }
        if (error instanceof NotBeforeError) {
          throw new UnauthorizedException('Token não está disponível ainda');
        }

        throw new UnauthorizedException('Erro desconhecido ao verificar token');
      }
      return true;
    }
  
    private extractTokenFromHeader(request: Request): string | null {
      const authorizationHeader = request.headers.authorization;
    
      if (!authorizationHeader) {
        throw new UnauthorizedException({
          message: 'nao ta pegando nenhum request no authorization',
        });; 
      }
      const [type, token] = authorizationHeader.split(' ');
      if (type === 'Bearer' && token) {
        return token; 
      }
      return null; 
    }
    
  
    // (chatGPT) Função para obter as roles requeridas na rota, caso existam
    private getRequiredRoles(context: ExecutionContext): string[] {
      const handler = context.getHandler();
      return Reflect.getMetadata('roles', handler); // Obtém a metadata da rota (caso tenha sido definida com o @Roles)
    }
  }
  