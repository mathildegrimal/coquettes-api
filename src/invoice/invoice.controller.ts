import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiBody, ApiHeader, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Invoice } from './entity/invoice.entity';
import { InvoiceDto } from './invoice.dto';
import { InvoiceService } from './invoice.service';

@ApiHeader({
  name: 'Commandes',
  description: 'Routes Commandes',
})
@ApiTags('invoice')
@Controller('invoice')
export class InvoiceController {
  constructor(private invoiceService: InvoiceService) {}

  @Get('all')
  public async getInvoices(): Promise<Invoice[]> {
    return this.invoiceService.getInvoices();
  }

  @ApiOkResponse({
    description: 'The record has been successfully get',
    type: Invoice,
  })
  @Get('number/:number')
  public async getInvoiceByNumber(
    @Param('number') number: string,
  ): Promise<Invoice> {
    const numberEncoded = encodeURIComponent(number);
    console.log(numberEncoded);
    return await this.invoiceService.getInvoiceByNumber(numberEncoded);
  }

  @ApiOkResponse({
    description: 'The record has been successfully get',
    type: Invoice,
  })
  @Get('id/:id')
  public async getInvoiceById(@Param('id') id: string): Promise<Invoice> {
    return await this.invoiceService.getInvoiceById(id);
  }

  @ApiOkResponse({
    description: 'The record has been successfully get',
    type: Invoice,
  })
  @Get('year/:year')
  public async getInvoicesByYear(@Param('year') year: string) {
    return await this.invoiceService.getMaxOrderInvoiceByYear(year);
  }

  @Post('/new')
  @ApiBody({ type: [InvoiceDto] })
  public async newCommand(@Body() invoiceDto: InvoiceDto) {
    return await this.invoiceService.postInvoice(invoiceDto);
  }
}
