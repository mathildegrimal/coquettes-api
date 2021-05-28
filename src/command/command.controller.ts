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
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('command')
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

  @ApiOkResponse({
    description: 'The record has been successfully get',
    type: Command,
  })
  @Get('/all')
  public getAllCommands(): Promise<Command[]> {
    return this.commandService.getAllCommands();
  }

  @ApiOkResponse({
    description: 'Get one Command bu Id success',
    type: Command,
  })
  @Get('/:commandid')
  async getOneCommand(@Param('commandid') commandid: string) {
    return await this.commandService.getOneCommand(commandid);
  }

  @ApiOkResponse({
    description: 'Get all Commands from one Client success',
    type: Command,
  })
  @Get('/all/:clientid')
  public getAllCommandsByClientId(@Param('clientid') clientid: string) {
    return this.commandService.getAllCommandsByClientId(clientid);
  }

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

  @Patch('/update/:id/:deliveryNumber')
  update(
    @Param('id') id: string,
    @Param('deliveryNumber') deliveryNumber: string,
  ) {
    return this.commandService.updateDeliveryNumberCommand(id, deliveryNumber);
  }
}
