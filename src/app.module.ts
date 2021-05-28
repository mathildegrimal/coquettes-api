// import { HttpModule } from '@nestjs/common';
import { Module } from '@nestjs/common';
import { CommandModule } from './command/command.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ClientModule } from './client/client.module';
import { InvoiceModule } from './invoice/invoice.module';
import { PdfModule } from './pdf/pdf.module';
import { DeliveryModule } from './delivery/delivery.module';
import { getConnectionOptions } from 'typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
    TypeOrmModule.forRootAsync({
      useFactory: async () =>
        Object.assign(await getConnectionOptions(), {
          autoLoadEntities: true,
          //entities:[AdminUser]
        }),
    }),
    CommandModule,
    ClientModule,
    InvoiceModule,
    PdfModule,
    DeliveryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
