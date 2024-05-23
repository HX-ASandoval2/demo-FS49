import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';

//* DEVUELVE true || false
function validateRequest(request: Request) {
  const token = request.headers['token'];
  if (token === 'ValidToken') return true;
  else return false;
  // return token === 'ValidToken';
}

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    //* Obtenemos Request
    const request = context.switchToHttp().getRequest();

    //* Lógica => true || false
    return validateRequest(request);
  }
}
