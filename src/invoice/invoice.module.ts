import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommandModule } from 'src/command/command.module';
import { Invoice } from './entity/invoice.entity';
import { InvoiceController } from './invoice.controller';
import { InvoiceService } from '../../src/invoice/invoice.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Invoice]),
    forwardRef(() => CommandModule),
  ],
  controllers: [InvoiceController],
  providers: [InvoiceService],
  exports: [InvoiceService],
})
export class InvoiceModule {}
