import { forwardRef, HttpModule, Module } from '@nestjs/common';
import { CommandController } from './command.controller';
import { CommandService } from './command.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Command } from './entity/command.entity';
import { ClientModule } from 'src/client/client.module';
import { InvoiceModule } from 'src/invoice/invoice.module';
import { ConfigModule } from 'config/ConfigModule';

@Module({
  imports: [
    TypeOrmModule.forFeature([Command]),
    forwardRef(() => ClientModule),
    forwardRef(() => InvoiceModule),
    HttpModule,
    ConfigModule,
  ],
  controllers: [CommandController],
  providers: [CommandService],
  exports: [CommandService],
})
export class CommandModule {}
