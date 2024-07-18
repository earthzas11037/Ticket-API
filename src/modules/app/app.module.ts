import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from 'src/common/middleware/logger.middleware';
import { RequestIdMiddleware } from 'src/common/middleware/request-id.middleware';
import configuration from 'src/config/configuration';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as httpContext from 'express-http-context';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketModule } from 'src/modules/ticket/ticket.module';
import { Ticket } from 'src/modules/ticket/entities/ticket.entity';
import { Status } from 'src/modules/ticket/entities/status.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        // entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        entities: [Ticket, Status],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    TicketModule,
  ],
  controllers: [
    AppController
  ],
  providers: [
    AppService
  ],
  exports: []
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(httpContext.middleware)
      .forRoutes('*')

      .apply(RequestIdMiddleware, LoggerMiddleware)
      .forRoutes('*')
  }
}
