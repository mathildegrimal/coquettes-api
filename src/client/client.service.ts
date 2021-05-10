import { HttpException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Command } from 'src/command/entity/command.entity';
import { Repository } from 'typeorm';
import { Client } from './entity/client.entity';

interface IClient {
  readonly firstname: string;
  readonly lastname: string;
  readonly adress: string;
  readonly email: string;
  readonly commands: Command[];
}

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
  ) {}

  async getClients(): Promise<Client[]> {
    return this.clientRepository.find();
  }

  async getClientById(id: number): Promise<Client> {
    const client = await this.clientRepository.findOne({ id });
    if (!client) {
      throw new HttpException('Not found', 404);
    }
    return client;
  }

  async postClient(client: IClient): Promise<any> {
    return this.clientRepository.save(client);
  }
}
