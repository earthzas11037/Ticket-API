import { Controller, Get, Post, Body, Param, Delete, Patch, ValidationPipe, Res, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateTicketDto } from 'src/modules/ticket/dtos/create-ticket.dto';
import { UpdateTicketDto } from 'src/modules/ticket/dtos/update-ticket.dto';
import { Ticket } from 'src/modules/ticket/entities/ticket.entity';
import { TicketService } from 'src/modules/ticket/services/ticket.service';
import { Response } from 'express';

@ApiTags('Ticket')
@Controller('ticket')
export class TicketController {
  constructor(private readonly ticketService: TicketService) { }

  @Get()
  async findAll(@Res() res: Response) {
    try {
      const result = await this.ticketService.findAll();

      res.status(HttpStatus.OK).json(result);
    } catch (err) {
      res.status(HttpStatus.BAD_REQUEST).json({
        message: 'fail',
        status: 400,
        data: null
      });
    }
  }

  @Get('detail/:id')
  async findOne(@Param('id') id: number, @Res() res: Response) {
    try {
      const result = await this.ticketService.findOne(id);

      res.status(HttpStatus.OK).json(result);
    } catch (err) {
      res.status(HttpStatus.BAD_REQUEST).json({
        message: 'fail',
        status: 400,
        data: null
      });
    }
  }

  @Post()
  async create(@Body(ValidationPipe) createTicketDto: CreateTicketDto, @Res() res: Response) {
    try {
      const ticket = new Ticket();
      ticket.title = createTicketDto.title;
      ticket.description = createTicketDto.description;
      ticket.contact = createTicketDto.contact;
      ticket.status = createTicketDto.status;
      console.log(ticket)
      const result = await this.ticketService.create(ticket);

      res.status(HttpStatus.OK).json(result);

    } catch (err) {
      res.status(HttpStatus.BAD_REQUEST).json({
        message: 'fail',
        status: 400,
        data: null
      });
    }
  }

  @Patch('update/:id')
  async update(@Param('id') id: number, @Body(ValidationPipe) updateTicketDto: UpdateTicketDto, @Res() res: Response) {
    try {
      const result = await this.ticketService.update(id, updateTicketDto);

      res.status(HttpStatus.OK).json(result);

    } catch (err) {
      res.status(HttpStatus.BAD_REQUEST).json({
        message: 'fail',
        status: 400,
        data: null
      });
    }
  }

  // @Delete('delete/:id')
  // async remove(@Param('id') id: number): Promise<void> {
  //   await this.ticketService.remove(id);
  //   return { success: true }
  // }
}