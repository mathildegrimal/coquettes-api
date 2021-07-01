import { ApiProperty } from '@nestjs/swagger';

export class CommandDto {
  @ApiProperty()
  readonly date: Date;
  @ApiProperty()
  readonly amount: number;
  @ApiProperty()
  readonly transport: string;
  @ApiProperty()
  readonly adress: string;
  @ApiProperty()
  readonly zipcode: string;
  @ApiProperty()
  readonly city: string;
  @ApiProperty()
  readonly client: string;
  @ApiProperty()
  readonly invoice: string;
  @ApiProperty()
  readonly products: any;
}
