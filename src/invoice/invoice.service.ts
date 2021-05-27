import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Invoice } from './entity/invoice.entity';
import { InvoiceDto } from './invoice.dto';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectRepository(Invoice)
    private readonly invoiceRepository: Repository<Invoice>,
  ) {}

  async getInvoices(): Promise<Invoice[]> {
    return this.invoiceRepository.find();
  }
  async getInvoiceById(id: string): Promise<Invoice> {
    const invoice = await this.invoiceRepository.findOne({
      where: { id: id },
    });
    if (!invoice) {
      throw new HttpException('Not found', 404);
    }
    return invoice;
  }
  async getInvoiceByNumber(number: string): Promise<Invoice> {
    const invoice = await this.invoiceRepository.findOne({
      where: { number: number },
    });
    if (!invoice) {
      throw new HttpException('Not found', 404);
    }
    return invoice;
  }

  async getMaxOrderInvoiceByYear(year: string): Promise<any> {
    const max = await this.invoiceRepository
      .createQueryBuilder('invoice')
      .select('max(invoice.order)', 'max')
      .where('invoice.year = :year', { year: year })
      .getRawOne();

    return max;
  }

  async postInvoice(invoice: InvoiceDto): Promise<Invoice> {
    return this.invoiceRepository.save(invoice);
  }
}
