import { ApiProperty } from '@nestjs/swagger';
import { Ticket } from 'src/modules/ticket/entities/ticket.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Status {
  @ApiProperty({ description: 'id of the status ticket' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'name of the status ticket' })
  @Column()
  name: string;

  @OneToMany(() => Ticket, (ticket) => ticket.status)
  tickets?: Ticket[];
}
