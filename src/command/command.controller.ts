import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CommandService } from './command.service';
import { CommandDto } from './command.dto';
import { Command } from './entity/command.entity';

@Controller('command')
export class CommandController {
  constructor(private readonly commandService: CommandService) {}

  @Get()
  public getCommands(): Promise<Command[]> {
    return this.commandService.getCommands();
  }
  @Get(':id')
  public getCommandById(@Param('id') id: number) {
    return this.commandService.getCommandById(id);
  }
  //getAllbyClient
  @Get('/client/:id')
  public getCommandByClientId(@Param('id') id: number) {
    return this.commandService.getCommandById(id);
  }
  @Post('/new')
  public postCommand(@Body() command: CommandDto): Promise<any> {
    return this.commandService.postCommand(command);
  }
}
