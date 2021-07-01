import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Client } from './entity/client.entity';
import { ClientService } from './client.service';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ClientDto } from './client.dto';

@ApiTags('Client')
@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @ApiOperation({ summary: 'Getting all clients' })
  @ApiOkResponse({
    description: 'Found records',
    type: Client,
  })
  @Get('all')
  public getCommands(): Promise<Client[]> {
    return this.clientService.getClients();
  }

  @ApiOperation({ summary: 'Deleting one client with his Id' })
  @ApiOkResponse({
    description: 'Client deleted',
  })
  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.clientService.remove(id);
  }

  @ApiOperation({ summary: 'Deleting one client with his email' })
  @ApiOkResponse({
    description: 'Client deleted',
  })
  @Delete('delete/email/:email')
  removeByEmail(@Param('email') email: string) {
    return this.clientService.removeByEmail(email);
  }

  @ApiOperation({ summary: 'Getting one client with his id' })
  @ApiOkResponse({
    description: 'Found record',
    type: Client,
  })
  @Get(':id')
  public getClientById(@Param('id') id: string) {
    return this.clientService.getClientById(id);
  }

  @ApiOperation({ summary: 'Creating a new client' })
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: Client,
  })
  @Post('/new')
  postClient(@Body() clientDto: ClientDto) {
    return this.clientService.postClient(clientDto);
  }

  @ApiOperation({ summary: 'Creating a payment intent for stripe' })
  @Post('/create-payment-intent')
  async paymentIntent(@Body() data: any) {
    return await this.clientService.postClient(data);
  }
}
