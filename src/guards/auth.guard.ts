import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    //* Obtenemos Request
    const request = context.switchToHttp().getRequest();

    const token = request.headers.authorization?.split(' ')[1];

    if (!token) throw new UnauthorizedException('Bearer token not found');

    try {
      const secret = process.env.JWT_SECRET;
      const payload = this.jwtService.verify(token, { secret });
      console.log(payload);

      // ? Expiración -> expira a las...
      payload.exp = new Date(payload.exp * 1000);

      // ? Emisión -> emitido a las...
      payload.iat = new Date(payload.iat * 1000);

      // ? damos permisos de administrador
      payload.roles = ['admin'];

      console.log(payload, 'payload');

      request.user = payload;

      console.log(request.user);

      return true;
    } catch (error) {
      // console.log(error);

      throw new UnauthorizedException('Invalid token');
    }
  }
}
