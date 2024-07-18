import { Status } from 'src/modules/ticket/entities/status.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';

@Entity()
export class Ticket {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text', { default: null, nullable: true })
  description: string;

  @Column('text', { default: null, nullable: true })
  contact: string;

  @ManyToOne(() => Status, (status) => status.tickets)
  status: Status;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;
}