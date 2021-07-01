import { HttpService } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '../../config/config.service';
import { ClientService } from 'src/client/client.service';
import { Client } from 'src/client/entity/client.entity';
import { Invoice } from 'src/invoice/entity/invoice.entity';
import { InvoiceService } from 'src/invoice/invoice.service';
import { CommandService } from 'src/command/command.service';
import { Command } from './entity/command.entity';
import Axios from 'axios';
//import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
const AXIOS_INSTANCE_TOKEN = 'AXIOS_INSTANCE_TOKEN';
describe('CommandService', () => {
  let service: CommandService;

  // let repo: Repository<Command>;

  // let clientService: ClientService;

  // let invoiceService: InvoiceService;

  // let httpService: HttpService;
  // let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandService,
        ClientService,
        InvoiceService,
        HttpService,
        ConfigService,
        {
          provide: getRepositoryToken(Command),
          useValue: {},
        },
        {
          provide: getRepositoryToken(Client),
          useValue: {},
        },
        {
          provide: getRepositoryToken(Invoice),
          useValue: {},
        },
        {
          provide: AXIOS_INSTANCE_TOKEN,
          useValue: Axios,
        },
      ],
    }).compile();

    service = module.get<CommandService>(CommandService);
    // repo = module.get<Repository<Command>>(getRepositoryToken(Command));
    // clientService = module.get<ClientService>(ClientService);
    // invoiceService = module.get<InvoiceService>(InvoiceService);
    // httpService = module.get<HttpService>(HttpService);
    // configService = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
