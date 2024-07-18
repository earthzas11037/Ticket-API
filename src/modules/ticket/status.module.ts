import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatusController } from 'src/modules/ticket/controllers/status.controller';
import { Status } from 'src/modules/ticket/entities/status.entity';
import { StatusService } from 'src/modules/ticket/services/status.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Status]),
  ],
  providers: [StatusService],
  controllers: [StatusController],
})
export class StatusModule { }