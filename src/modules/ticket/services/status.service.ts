import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Status } from 'src/modules/ticket/entities/status.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StatusService {
  constructor(
    @InjectRepository(Status)
    private statusRepository: Repository<Status>,
  ) { }

  findAll(): Promise<Status[]> {
    return this.statusRepository.find();
  }

  findOne(id: number): Promise<Status> {
    return this.statusRepository.findOneBy({ id });
  }

  create(status: Status): Promise<Status> {
    return this.statusRepository.save(status);
  }

  async remove(id: number): Promise<void> {
    await this.statusRepository.delete(id);
  }
}