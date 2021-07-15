module.exports = {
  name: 'default',
  type: 'postgres',
  host: 'bwtqvotofps58nmjvkic-postgresql.services.clever-cloud.com',
  port: 5432,
  username: 'u8zgxtf1wufzw3wkruc3',
  password: 'rtZbOwPOU3gGjjlAFiGn',
  database: 'bwtqvotofps58nmjvkic',
  migrations: ['migrations/*{.ts,.js}'],
  migrationsTableName: 'migrations_typeorm',
  migrationsRun: true,
  synchronize: false,
  logging: false,
  cli: {
    migrationsDir: 'migration',
  },
};
