import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatusModule } from 'src/modules/ticket/status.module';
import { Status } from 'src/modules/ticket/entities/status.entity';
import { Ticket } from 'src/modules/ticket/entities/ticket.entity';
import { TicketService } from 'src/modules/ticket/services/ticket.service';
import { TicketController } from 'src/modules/ticket/controllers/ticket.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Ticket, Status]),
    StatusModule
  ],
  providers: [TicketService],
  controllers: [TicketController],
})
export class TicketModule { }