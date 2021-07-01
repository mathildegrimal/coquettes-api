import { Module } from '@nestjs/common';
import { CommandModule } from './command/command.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ClientModule } from './client/client.module';
import { InvoiceModule } from './invoice/invoice.module';
import { typeOrmConfigAsync } from './config/typeorm.config';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
    TypeOrmModule.forRootAsync(typeOrmConfigAsync),
    CommandModule,
    ClientModule,
    InvoiceModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
