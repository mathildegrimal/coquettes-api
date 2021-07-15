import { Body, Controller, Get, Param, Patch, Post, Res } from '@nestjs/common';
import { CommandService } from './command.service';
import { CommandDto } from './command.dto';
import { Command } from './entity/command.entity';
import { Observable } from 'rxjs';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@ApiTags('Command')
@Controller('command')
export class CommandController {
  constructor(private commandService: CommandService) {}

  @ApiOperation({ summary: 'Get shipping status of every commmand' })
  @Get('shippingStatus')
  async getStatusCode(): Promise<Observable<any>> {
    return this.commandService.getStatusCode();
  }

  @ApiOperation({ summary: 'Get all commmands' })
  @ApiOkResponse({
    description: 'Records found',
    type: Command,
  })
  @Get('/all')
  async getAllCommands(): Promise<Command[]> {
    return await this.commandService.getAllCommands();
  }

  @ApiOperation({ summary: 'Get one command by Id' })
  @ApiOkResponse({
    description: 'The found record',
    type: Command,
  })
  @Get('/id/:commandid')
  async getOneCommand(@Param('commandid') commandid: string) {
    return await this.commandService.getOneCommand(commandid);
  }

  @ApiOperation({ summary: 'Get all commands from one client' })
  @ApiOkResponse({
    description: 'Records found',
    type: Command,
  })
  @Get('/all/:clientid')
  async getAllCommandsByClientId(@Param('clientid') clientid: string) {
    return await this.commandService.getAllCommandsByClientId(clientid);
  }

  @ApiOperation({ summary: 'Create one Command' })
  @ApiOkResponse({
    description: 'The command has been successfully created',
    type: Command,
  })
  @Post('/new')
  @ApiBody({ type: [CommandDto] })
  async newCommand(@Body() commandDto: CommandDto) {
    console.log("creation d'une nouvelle commande");
    return await this.commandService.postCommand(commandDto);
  }

  @ApiOperation({ summary: 'Updating delivery number of one command' })
  @Patch('/update/:id/:deliveryNumber')
  update(
    @Param('id') id: string,
    @Param('deliveryNumber') deliveryNumber: string,
  ) {
    console.log('deliveryUpdated');
    return this.commandService.updateDeliveryNumberCommand(id, deliveryNumber);
  }

  @ApiOperation({ summary: 'Get sum commands grouped by month' })
  @ApiOkResponse({
    description: 'Records found',
    type: Command,
  })
  @Get('/getSum/all')
  async getTotalCommandByMonth() {
    return await this.commandService.getTotalCommandsByMonth();
  }

  @ApiOperation({ summary: 'Generating one invoice with its number' })
  @ApiOkResponse({
    description: 'Invoice generated',
    type: Command,
  })
  @Get('invoice/new/:id')
  async getPDF(@Res() res: Response, @Param('id') id: string): Promise<void> {
    const buffer = await this.commandService.generatePDFInvoice(id);

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'inline; filename=example.pdf',
      'Content-Length': buffer.length,
    });

    res.end(buffer);
  }
}
