// import { HttpModule } from '@nestjs/common';
import AdminBro from 'admin-bro';
import { Module } from '@nestjs/common';
import { CommandModule } from './command/command.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ClientModule } from './client/client.module';
import { InvoiceModule } from './invoice/invoice.module';
import { PdfModule } from './pdf/pdf.module';
import { DeliveryModule } from './delivery/delivery.module';
import { getConnectionOptions } from 'typeorm';
import { AdminModule } from '@admin-bro/nestjs';
import { User } from './user/entity/user.entity';
import { Database, Resource } from '@admin-bro/typeorm';
import { Client } from './client/entity/client.entity';
import { Invoice } from './invoice/entity/invoice.entity';
import { Command } from './command/entity/command.entity';
//import { UsersModule } from './users/users.module';
import { UserModule } from './user/user.module';
AdminBro.registerAdapter({ Database, Resource });

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
    TypeOrmModule.forRootAsync({
      useFactory: async () =>
        Object.assign(await getConnectionOptions(), {
          autoLoadEntities: true,
          entities: [],
        }),
    }),
    AdminModule.createAdmin({
      adminBroOptions: {
        rootPath: '/admin',
        resources: [User, Command, Client, Invoice],
      },
    }),

    CommandModule,
    ClientModule,
    InvoiceModule,
    PdfModule,
    DeliveryModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
