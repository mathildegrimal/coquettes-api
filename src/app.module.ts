import { Module } from '@nestjs/common';
import { CommandModule } from './command/command.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ClientModule } from './client/client.module';
import { InvoiceModule } from './invoice/invoice.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      autoLoadEntities: true,
      synchronize: true,
      migrations: ['migration/*.js'],
      migrationsTableName: 'migrations_typeorm',
      migrationsRun: true,
      cli: {
        migrationsDir: 'migration',
      },
      ssl: false,
    }),
    CommandModule,
    ClientModule,
    InvoiceModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
