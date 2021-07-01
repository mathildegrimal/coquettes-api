import {
  Body,
  Controller,
  Get,
  HttpService,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { CommandService } from './command.service';
import { CommandDto } from './command.dto';
import { Command } from './entity/command.entity';
import { Observable } from 'rxjs';
import { ConfigService } from '../../config/config.service';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
@ApiTags('Command')
@Controller('command')
export class CommandController {
  constructor(
    private commandService: CommandService,
    private readonly httpService: HttpService,
    private configService: ConfigService,
  ) {}

  @ApiOperation({ summary: 'Getting shipping status of every commmand' })
  @Get('shippingStatus')
  async getStatusCode(): Promise<Observable<any>> {
    return this.commandService.getStatusCode();
  }

  @ApiOperation({ summary: 'Getting all commmands' })
  @ApiOkResponse({
    description: 'Records found',
    type: Command,
  })
  @Get('/all')
  public getAllCommands(): Promise<Command[]> {
    return this.commandService.getAllCommands();
  }

  @ApiOperation({ summary: 'Getting one command by Id' })
  @ApiOkResponse({
    description: 'The found record',
    type: Command,
  })
  @Get('/:commandid')
  async getOneCommand(@Param('commandid') commandid: string) {
    return await this.commandService.getOneCommand(commandid);
  }

  @ApiOperation({ summary: 'Getting all commands from one client' })
  @ApiOkResponse({
    description: 'Records found',
    type: Command,
  })
  @Get('/all/:clientid')
  public getAllCommandsByClientId(@Param('clientid') clientid: string) {
    return this.commandService.getAllCommandsByClientId(clientid);
  }

  @ApiOperation({ summary: 'Create one Command' })
  @ApiOkResponse({
    description: 'The command has been successfully created',
    type: Command,
  })
  @Post('/new')
  @ApiBody({ type: [CommandDto] })
  public newCommand(@Body() commandDto: CommandDto) {
    console.log("creation d'une nouvelle commande");
    return this.commandService.postCommand(commandDto);
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

  @ApiOperation({ summary: 'Getting sum commands grouped by day' })
  @ApiOkResponse({
    description: 'Records found',
    type: Command,
  })
  @Get('/getSum/all')
  async getTotalCommandByDay() {
    return await this.commandService.getTotalCommandsByDay();
  }

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
