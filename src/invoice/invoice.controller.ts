import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Invoice } from './entity/invoice.entity';
import { InvoiceDto } from './invoice.dto';
import { InvoiceService } from './invoice.service';

@ApiTags('Invoice')
@Controller('invoice')
export class InvoiceController {
  constructor(private invoiceService: InvoiceService) {}

  @ApiOperation({ summary: 'Getting all invoices' })
  @ApiOkResponse({
    description: 'Found records',
    type: Invoice,
  })
  @Get('all')
  public async getInvoices(): Promise<Invoice[]> {
    return this.invoiceService.getInvoices();
  }

  @ApiOperation({ summary: 'Getting one invoice by number' })
  @ApiOkResponse({
    description: 'Found record',
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

  @ApiOperation({ summary: 'Getting one invoice by id' })
  @ApiOkResponse({
    description: 'Found record',
    type: Invoice,
  })
  @Get('id/:id')
  public async getInvoiceById(@Param('id') id: string): Promise<Invoice> {
    return await this.invoiceService.getInvoiceById(id);
  }

  @ApiOperation({ summary: 'Getting max order number of invoices by year' })
  @ApiOkResponse({
    description: 'max : number',
    type: Invoice,
  })
  @Get('year/:year')
  public async getInvoicesByYear(@Param('year') year: string) {
    return await this.invoiceService.getMaxOrderInvoiceByYear(year);
  }

  @ApiOperation({ summary: 'Creating a new invoice' })
  @ApiOkResponse({
    description: 'Invoice created',
    type: Invoice,
  })
  @Post('/new')
  @ApiBody({ type: [InvoiceDto] })
  public async newCommand(@Body() invoiceDto: InvoiceDto) {
    return await this.invoiceService.postInvoice(invoiceDto);
  }
}
