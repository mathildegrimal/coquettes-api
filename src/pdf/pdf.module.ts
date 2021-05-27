import { forwardRef, Module } from '@nestjs/common';
//import { CommandModule } from 'src/command/command.module';
//import { InvoiceModule } from 'src/invoice/invoice.module';
import { PdfController } from './pdf.controller';
import { PdfService } from './pdf.service';

@Module({
  imports: [],
  controllers: [PdfController],
  providers: [PdfService],
})
export class PdfModule {}
