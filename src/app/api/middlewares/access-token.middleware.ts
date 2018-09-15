import { MiddlewareFunction, NestMiddleware, Injectable } from '@nestjs/common';

import { JwtService } from '../../shared';

@Injectable()
export class AccessTokenMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}

  public resolve(...args: any[]): MiddlewareFunction {
    return (request, response, next) => {
      request.user = this.jwtService.verify(request.headers['x-access-token']);
      next();
    };
  }
}
