import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Invoice } from './entity/invoice.entity';
import { InvoiceDto } from './invoice.dto';
import { InvoiceService } from './invoice.service';

@Controller('invoice')
export class InvoiceController {
  constructor(private invoiceService: InvoiceService) {}

  @Get('all')
  public async getInvoices(): Promise<Invoice[]> {
    return this.invoiceService.getInvoices();
  }

  @Get('number/:number')
  public async getInvoiceByNumber(
    @Param('number') number: string,
  ): Promise<Invoice> {
    const numberEncoded = encodeURIComponent(number);
    console.log(numberEncoded);
    return await this.invoiceService.getInvoiceByNumber(numberEncoded);
  }

  @Get('id/:id')
  public async getInvoiceById(@Param('id') id: string): Promise<Invoice> {
    return await this.invoiceService.getInvoiceById(id);
  }

  @Get('year/:year')
  public async getInvoicesByYear(@Param('year') year: string) {
    return await this.invoiceService.getMaxOrderInvoiceByYear(year);
  }

  @Post('/new')
  public async newCommand(@Body() invoiceDto: InvoiceDto) {
    return await this.invoiceService.postInvoice(invoiceDto);
  }
}
