import { Body, Controller, Get, Param, Post, Request } from '@nestjs/common';
import { ClientDto } from './client.dto';
import { Client } from './entity/client.entity';
import { ClientService } from './client.service';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Get('all')
  public getCommands(): Promise<Client[]> {
    return this.clientService.getClients();
  }

  @Get(':id')
  public getClientById(@Param('id') id: number) {
    return this.clientService.getClientById(id);
  }
  @Post('/new')
  public postClient(@Request() req: Request) {
    console.log(req);
  }
}
