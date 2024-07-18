import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Status } from 'src/modules/ticket/entities/status.entity';
import { Ticket } from 'src/modules/ticket/entities/ticket.entity';

@Injectable()
export class TicketService {
  constructor(
    @InjectRepository(Ticket)
    private ticketsRepository: Repository<Ticket>,
    @InjectRepository(Status)
    private statusRepository: Repository<Status>,
  ) { }

  findAll(): Promise<Ticket[]> {
    return this.ticketsRepository.find({ relations: ['status'], order: { updated: 'ASC' } });
  }

  async findOne(id: number): Promise<Ticket> {
    const ticket = await this.ticketsRepository.findOne({
      where: { id },
      relations: ['status'],
    });
    if (!ticket) {
      throw new NotFoundException(`Ticket with ID ${id} not found`);
    }
    return ticket;
  }

  async create(createTicketDto: Partial<Ticket>): Promise<Ticket> {
    const status = await this.statusRepository.findOne({ where: { id: createTicketDto.status.id } });
    if (!status) {
      throw new NotFoundException(`Status with ID ${createTicketDto.status.id} not found`);
    }

    const ticket = this.ticketsRepository.create({
      ...createTicketDto,
      status,
    });
    return this.ticketsRepository.save(ticket);
  }

  async update(id: number, updateTicketDto: Partial<Ticket>): Promise<Ticket> {
    console.log('ssd')
    const ticket = await this.findOne(id);

    Object.assign(ticket, updateTicketDto);

    if (updateTicketDto.status) {
      const status = await this.statusRepository.findOne({ where: { id: updateTicketDto.status.id } });
      if (!status) {
        throw new NotFoundException(`Status with ID ${updateTicketDto.status.id} not found`);
      }
      ticket.status = status;
    }

    return this.ticketsRepository.save(ticket);
  }

  async remove(id: number): Promise<void> {
    await this.ticketsRepository.delete(id);
  }
}
