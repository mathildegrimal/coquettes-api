module.exports = {
  name: 'default',
  type: 'postgres',
  host: 'bhnrxamacay7u7zqkbo6-postgresql.services.clever-cloud.com',
  port: 5432,
  username: 'u9lapnpcmkhrahzfemnq',
  password: 'CUh1myP599Hi5jL9Kp8P',
  database: 'bhnrxamacay7u7zqkbo6',
  migrations: ['dist/migrations/*{.ts,.js}'],
  migrationsTableName: 'migrations_typeorm',
  migrationsRun: true,
  synchronize: false,
  logging: false,
};
