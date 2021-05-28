import { ApiProperty } from '@nestjs/swagger';

export class ClientDto {
  @ApiProperty()
  readonly firstname: string;
  @ApiProperty()
  readonly lastname: string;
  @ApiProperty()
  readonly adress: string;
  @ApiProperty()
  readonly email: string;
}
