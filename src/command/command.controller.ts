import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CommandService } from './command.service';
import { CommandDto } from './command.dto';
import { Command } from './entity/command.entity';

@Controller('command')
export class CommandController {
  constructor(private readonly commandService: CommandService) {}

  @Get('/all')
  public getAllCommands(): Promise<Command[]> {
    return this.commandService.getAllCommands();
  }
  //One command from one client

  @Get('/:commandid')
  public getOneCommand(@Param('commandid') commandid: number) {
    return this.commandService.getOneCommand(commandid);
  }

  //All commands from one client
  @Get('/all/:clientid')
  public getAllCommandsByClientId(@Param('clientid') clientid: number) {
    return this.commandService.getAllCommandsByClientId(clientid);
  }

  //create new command
  @Post('/new')
  public postCommand(@Body() command: CommandDto): Promise<any> {
    return this.commandService.postCommand(command);
  }
}
