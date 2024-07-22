import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class BasicAuthGuard implements CanActivate {
  constructor(private configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException('Authorization header not found');
    }

    const [type, credentials] = authHeader.split(' ');

    if (type !== 'Basic' || !credentials) {
      throw new UnauthorizedException('Invalid authorization header format');
    }

    const decodedCredentials = Buffer.from(credentials, 'base64').toString(
      'utf-8'
    );
    const [username, password] = decodedCredentials.split(':');

    if (this.validateCredentials(username, password)) {
      return true;
    } else {
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  validateCredentials(username: string, password: string): boolean {
    const validUsername = this.configService.get('basicAuth.username');
    const validPassword = this.configService.get('basicAuth.password');

    return username === validUsername && password === validPassword;
  }
}
