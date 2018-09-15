import {
  MiddlewareFunction,
  Middleware,
  NestMiddleware,
  Injectable
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { join } from 'path';

const version = require(join(process.cwd(), 'package.json')).version;

@Injectable()
export class VersionMiddleware implements NestMiddleware {
  public resolve(...args: any[]): MiddlewareFunction {
    return (request: Request, response: Response, next: NextFunction) => {
      response.set('X-Version', version);
      next();
    };
  }
}
