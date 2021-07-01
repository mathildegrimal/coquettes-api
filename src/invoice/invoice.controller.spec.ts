import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InvoiceController } from '../../src/invoice/invoice.controller';
import { InvoiceService } from '../../src/invoice/invoice.service';
import { Invoice } from './entity/invoice.entity';

describe('InvoiceController', () => {
  let controller: InvoiceController;
  let repo: Repository<Invoice>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InvoiceController],
      providers: [
        InvoiceService,
        {
          provide: getRepositoryToken(Invoice),
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<InvoiceController>(InvoiceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
