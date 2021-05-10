import { Command } from 'src/command/entity/command.entity';

export class ClientDto {
  readonly firstname: string;
  readonly lastname: string;
  readonly adress: string;
  readonly email: string;
  readonly commands: Command[];
}
