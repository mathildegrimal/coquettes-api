import { HttpModule } from '@nestjs/common';
import { Module } from '@nestjs/common';
// import { CommandModule } from './command/command.module';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { ConfigModule } from '@nestjs/config';
// import { ClientModule } from './client/client.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    // ConfigModule.forRoot({ envFilePath: '.env' }),
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   host: 'ec2-54-195-76-73.eu-west-1.compute.amazonaws.com',
    //   port: 5432,
    //   username: 'ooypxvpejoockv',
    //   password:
    //     '820a8e4d5da422c46574dd1d84c8568c133997ca0aec6ba1c0117ed7dee752b5',
    //   database: 'dc2rii2r5knt2d',
    //   autoLoadEntities: true,
    //   migrations: ['dist/migrations/*{.ts,.js}'],
    //   migrationsTableName: 'migrations_typeorm',
    //   migrationsRun: true,
    //   synchronize: true,
    // }),
    // CommandModule,
    // ClientModule,
    HttpModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
