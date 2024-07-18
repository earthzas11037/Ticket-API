import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        message: 'Authorization header is missing',
        status: 401,
      });
    }

    if (!authHeader.startsWith('Bearer ')) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        message: 'Invalid authorization format',
        status: 401,
      });
    }

    const token = authHeader.substring(7);
    const key = process.env.API_KEY
    if (!!key && token != key) {
      console.log('bearerToken is not Pass')
      return res.status(HttpStatus.UNAUTHORIZED).json({
        message: 'unauthorized',
        status: 401,
      });
    }

    next();
  }
}