import { Body, Controller, Get, Post } from '@nestjs/common';
import { Client } from './entity/client.entity';
import { ClientService } from './client.service';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

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
  async getClients(): Promise<Client[]> {
    return await this.clientService.getClients();
  }

  @ApiOperation({ summary: 'Creating a new client' })
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: Client,
  })
  @Post('/new')
  async postClient(@Body() data: any) {
    return await this.clientService.postClient(data);
  }

  @ApiOperation({
    summary: 'Creating a new client and a payment intent for stripe',
  })
  @Post('/create-payment-intent')
  async paymentIntent(@Body() data: any) {
    return await this.clientService.postClient(data);
  }
}
