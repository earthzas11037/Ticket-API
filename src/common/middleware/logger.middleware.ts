import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor() { }
  private logger = new Logger('HTTP');

  async use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl } = req;
    const start = Date.now();

    res.on('finish', async () => {
      const { statusCode } = res;
      const elapsed = Date.now() - start;
      this.logger.log(`${method} ${originalUrl} ${statusCode} ${elapsed}ms`);
    });
    next();
  }
}