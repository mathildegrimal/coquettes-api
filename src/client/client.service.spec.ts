import { Test, TestingModule } from '@nestjs/testing';
//import { Repository } from 'typeorm';
import { ClientService } from '../../src/client/client.service';
import { Client } from './entity/client.entity';

import { getRepositoryToken } from '@nestjs/typeorm';

describe('ClientService', () => {
  let service: ClientService;
  //let repo: Repository<Client>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClientService,
        {
          provide: getRepositoryToken(Client),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<ClientService>(ClientService);
    //repo = module.get<Repository<Client>>(getRepositoryToken(Client));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
