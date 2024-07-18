import { Test, TestingModule } from '@nestjs/testing';
import { TicketController } from 'src/modules/ticket/controllers/ticket.controller';
import { TicketService } from 'src/modules/ticket/services/ticket.service';

const mockTicketService = {
  // findAll: jest.fn().mockResolvedValue([]),
  // findOne: jest.fn().mockResolvedValue({  }),
  create: jest.fn().mockResolvedValue({
    "title": "Ticket 1",
    "description": "Unable to login to the application with correct credentials.",
    "contact": "email: user@example.com, phone: +66919906083",
    "status": {
      "id": 1,
      "name": "pending"
    }
  }),
  update: jest.fn().mockResolvedValue({
    "title": "Ticket 1",
    "description": "Update description",
    "contact": "email: update@example.com, phone: +66919906083",
    "status": {
      "id": 2,
      "name": "accepted"
    }
  }),
};

describe('TicketController', () => {
  let controller: TicketController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TicketController],
      providers: [
        {
          provide: TicketService,
          useValue: mockTicketService,
        },
      ],
    }).compile();

    controller = module.get<TicketController>(TicketController);
  });

  // it('should be defined', () => {
  //   expect(controller).toBeDefined();
  // });

  // it('should get all tickets', async () => {
  //   const tickets = await controller.findAll();
  //   expect(tickets).toEqual([]);
  // });

  // it('should get a ticket by id', async () => {
  //   const ticket = await controller.findOne(1);
  //   expect(ticket).toEqual({ id: '1', title: 'Test Ticket' });
  // });

  it('should create a new ticket', async () => {
    const ticket = await controller.create({
      "title": "Ticket 1",
      "description": "Unable to login to the application with correct credentials.",
      "contact": "email: user@example.com, phone: +66919906083",
      "status": {
        "id": 1,
        "name": "",
        "tickets": undefined
      }
    });
    expect(ticket).toEqual({
      "title": "Ticket 1",
      "description": "Unable to login to the application with correct credentials.",
      "contact": "email: user@example.com, phone: +66919906083",
      "status": {
        "id": 1,
        "name": "pending"
      }
    });
  });

  it('should update a ticket', async () => {
    const ticket = await controller.update(1, {
      "title": "Ticket 1",
      "description": "Update description",
      "contact": "email: update@example.com, phone: +66919906083",
      "status": {
        "id": 2,
        "name": "accepted",
        "tickets": undefined
      }
    });
    expect(ticket).toEqual({
      "title": "Ticket 1",
      "description": "Update description",
      "contact": "email: update@example.com, phone: +66919906083",
      "status": {
        "id": 2,
        "name": "accepted"
      }
    });
  });
});