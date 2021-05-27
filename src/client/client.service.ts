import { HttpException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientDto } from './client.dto';
import { Client } from './entity/client.entity';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
  ) {}

  async getClients(): Promise<Client[]> {
    return this.clientRepository.find();
  }

  async getClientById(id: string): Promise<Client> {
    const client = await this.clientRepository.findOne({ id });
    if (!client) {
      throw new HttpException('Not found', 404);
    }
    return client;
  }

  async getClientByInfos(
    firstname: string,
    lastname: string,
    email: string,
  ): Promise<Client> {
    const client = await this.clientRepository.findOne({
      where: { firstname, lastname, email },
    });
    // if (!client) {
    //   throw new HttpException('Not found', 404);
    // }
    return client;
  }

  async postClient(client: ClientDto): Promise<Client> {
    return this.clientRepository.save(client);
  }

  async remove(id: string): Promise<void> {
    await this.clientRepository.delete(id);
  }
  async removeByEmail(email: string): Promise<void> {
    await this.clientRepository.delete({ email: email });
  }
}
