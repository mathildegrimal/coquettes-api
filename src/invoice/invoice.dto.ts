import { ApiProperty } from '@nestjs/swagger';

export class InvoiceDto {
  @ApiProperty()
  readonly order: number;
  @ApiProperty()
  readonly year: string;
  @ApiProperty()
  readonly number: string;
  @ApiProperty()
  readonly amount: number;
}
