import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../decorator';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly jwt: JwtService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // Skip JWT validation for @Public() routes
    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const auth = request.headers.authorization;

    if (!auth?.startsWith('Bearer ')) {
      throw new UnauthorizedException('Bearer token required');
    }

    try {
      const rs = await this.jwt.verifyAsync(auth.slice(7), {
        secret: process.env.JWT_SECRET,
      });
      request.user = rs;

      return true;
    } catch (error) {
      console.log('error', error);
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
