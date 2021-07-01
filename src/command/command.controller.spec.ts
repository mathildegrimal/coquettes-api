import { Test, TestingModule } from '@nestjs/testing';
import { CommandController } from '../../src/command/command.controller';
import { CommandService } from '../../src/command/command.service';

describe('CommandController', () => {
  let controller: CommandController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommandController],
      providers: [CommandService],
    }).compile();

    controller = module.get<CommandController>(CommandController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
