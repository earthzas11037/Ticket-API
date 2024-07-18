import { Controller, Get, Post, Body, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { Status } from 'src/modules/ticket/entities/status.entity';
import { StatusService } from 'src/modules/ticket/services/status.service';

@Controller('ticket/status')
export class StatusController {
  constructor(private readonly statusService: StatusService) { }

  @Get()
  async findAll(@Res() res: Response) {
    try {
      const result = await this.statusService.findAll();

      res.status(HttpStatus.OK).json(result);
    } catch (err) {
      res.status(HttpStatus.BAD_REQUEST).json({
        message: 'fail',
        status: 400,
        data: null
      });
    }
  }

  // @Get(':id')
  // findOne(@Param('id') id: number): Promise<Status> {
  //   return this.statusService.findOne(id);
  // }

  // @Post()
  // create(@Body() user: Status): Promise<Status> {
  //   return this.statusService.create(user);
  // }

  // @Delete(':id')
  // async remove(@Param('id') id: number): Promise<void> {
  //   return this.statusService.remove(id);
  //   return { success: true }
  // }
}