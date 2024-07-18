import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { Status } from 'src/modules/ticket/entities/status.entity';

export class CreateTicketDto {
  @ApiProperty({ description: 'Title of the ticket', required: false, example: 'Ticket 1' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: 'Description of the ticket', required: false, example: 'Develop web application for sales tickets' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: 'Contact of the ticket', required: false, example: 'email: user@example.com, phone: +66919906083' })
  @IsString()
  @IsOptional()
  contact: string;

  @ApiProperty({ description: 'Status of the ticket', required: true, example: { id: 1 } })
  @IsNotEmpty()
  status: Status;
}