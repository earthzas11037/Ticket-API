import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { compact } from 'lodash';

@Injectable()
export class IpWhitelistMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const whitelist = process.env.DFWHITELISTIP || ""
    const whitelistIP = compact(whitelist.split(';'))

    if (whitelistIP.length == 0) {
      next();
    } else {
      var ip = req.headers['cf-connecting-ip']
      if (Array.isArray(ip)) {
        ip = ip[0];
      }
      if (whitelistIP.includes(ip)) {
        next();
      } else {
        res.status(404).json({ message: 'IP address is not whitelisted :' });
      }
    }
  }
}