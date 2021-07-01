import { HttpService } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '../../config/config.service';
import { CommandController } from '../../src/command/command.controller';
import { CommandService } from '../../src/command/command.service';
const AXIOS_INSTANCE_TOKEN = 'AXIOS_INSTANCE_TOKEN';
import Axios from 'axios';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Command } from './entity/command.entity';
import { ClientService } from 'src/client/client.service';
import { Client } from 'src/client/entity/client.entity';
import { InvoiceService } from 'src/invoice/invoice.service';
import { Invoice } from 'src/invoice/entity/invoice.entity';
describe('CommandController', () => {
  let controller: CommandController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommandController],
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

    controller = module.get<CommandController>(CommandController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
