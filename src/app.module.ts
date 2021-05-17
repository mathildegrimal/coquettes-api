// import { HttpModule } from '@nestjs/common';
import { Module } from '@nestjs/common';
import { CommandModule } from './command/command.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ClientModule } from './client/client.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
    TypeOrmModule.forRoot({
      name: 'default',
      type: 'postgres',
      host: 'bhnrxamacay7u7zqkbo6-postgresql.services.clever-cloud.com',
      port: 5432,
      username: 'u9lapnpcmkhrahzfemnq',
      password: 'CUh1myP599Hi5jL9Kp8P',
      database: 'bhnrxamacay7u7zqkbo6',
      autoLoadEntities: true,
      migrations: ['dist/migrations/*{.ts,.js}'],
      migrationsTableName: 'migrations_typeorm',
      migrationsRun: true,
      synchronize: true,
      logging: false,
    }),
    CommandModule,
    ClientModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
