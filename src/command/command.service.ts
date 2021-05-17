import { HttpException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from 'src/client/entity/client.entity';
import { Repository } from 'typeorm';
import { Command } from './entity/command.entity';

interface ICommand {
  readonly id: number;
  readonly orderNumber: string;
  readonly date: string;
  readonly status: string;
  readonly amount: number;
  readonly billNumber: number;
  readonly client: Client;
  readonly deliveryNumber: number;
}

@Injectable()
export class CommandService {
  constructor(
    @InjectRepository(Command)
    private readonly commandRepository: Repository<Command>,
  ) {}

  async getAllCommands(): Promise<Command[]> {
    return this.commandRepository.find();
  }

  async getOneCommand(commandid: number): Promise<Command> {
    const command = await this.commandRepository.findOne({ id: commandid });
    if (!command) {
      throw new HttpException('Not found', 404);
    }
    return command;
  }

  //TODO: getCommandByClientID()
  async getAllCommandsByClientId(clientid: number): Promise<Command[]> {
    const commands = await this.commandRepository.find({
      client: { id: clientid },
    });

    if (!commands) {
      throw new HttpException('Not found', 404);
    }
    return commands;
  }

  async postCommand(command: ICommand): Promise<any> {
    return this.commandRepository.save(command);
  }
}
