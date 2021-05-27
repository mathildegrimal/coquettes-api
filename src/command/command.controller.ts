import {
  Body,
  Controller,
  Get,
  HttpService,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CommandService } from './command.service';
import { CommandDto } from './command.dto';
import { Command } from './entity/command.entity';
import { Observable } from 'rxjs';
import { ConfigService } from 'config/config.service';

@Controller('command')
export class CommandController {
  constructor(
    private commandService: CommandService,
    private readonly httpService: HttpService,
    private configService: ConfigService,
  ) {}

  @Get('shippingStatus')
  async getStatusCode(): Promise<Observable<any>> {
    return this.commandService.getStatusCode();
  }

  @Get('/all')
  public getAllCommands(): Promise<Command[]> {
    return this.commandService.getAllCommands();
  }
  //One command from one client

  @Get('/:commandid')
  async getOneCommand(@Param('commandid') commandid: string) {
    return await this.commandService.getOneCommand(commandid);
  }

  //All commands from one client
  @Get('/all/:clientid')
  public getAllCommandsByClientId(@Param('clientid') clientid: string) {
    return this.commandService.getAllCommandsByClientId(clientid);
  }

  //create new command
  @Post('/new')
  public newCommand(@Body() commandDto: CommandDto) {
    console.log("creation d'une nouvelle commande");
    return this.commandService.postCommand(commandDto);
  }

  @Patch('/update/:id/:deliveryNumber')
  update(
    @Param('id') id: string,
    @Param('deliveryNumber') deliveryNumber: string,
  ) {
    return this.commandService.updateDeliveryNumberCommand(id, deliveryNumber);
  }
}
