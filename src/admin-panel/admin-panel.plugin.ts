import { INestApplication } from '@nestjs/common';
import AdminBro from 'admin-bro';
import { validate } from 'class-validator';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const AdminBroExpress = require('@admin-bro/express');

import { Database, Resource } from '@admin-bro/typeorm';

import { createConnection } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Command } from 'src/command/entity/command.entity';
import { Client } from 'src/client/entity/client.entity';
import { Invoice } from 'src/invoice/entity/invoice.entity';
import * as bcrypt from 'bcrypt';

export async function setupAdminPanel(app: INestApplication): Promise<void> {
  AdminBro.registerAdapter({ Database, Resource });
  Resource.validate = validate;
  
  const connection = await createConnection({
    name: 'test',
    type: 'postgres',
    host: 'bhnrxamacay7u7zqkbo6-postgresql.services.clever-cloud.com',
    port: 5432,
    username: 'u9lapnpcmkhrahzfemnq',
    password: 'CUh1myP599Hi5jL9Kp8P',
    database: 'bhnrxamacay7u7zqkbo6',
    entities: [User, Command, Client, Invoice],
    synchronize: true,
  });

  User.useConnection(connection);
  Command.useConnection(connection);
  Client.useConnection(connection);
  Invoice.useConnection(connection);

  const adminBro = new AdminBro({
    resources: [
      {
        resource: User,
        options: {
          properties: {
            encryptedPassword: {
              isVisible: false,
            },
            password: {
              type: 'string',
              isVisible: {
                list: false,
                edit: true,
                filter: false,
                show: false,
              },
            },
          },
          actions: {
            new: {
              before: async (request) => {
                if (request.payload.password) {
                  request.payload = {
                    ...request.payload,
                    encryptedPassword: await bcrypt.hash(
                      request.payload.password,
                      10,
                    ),
                    password: undefined,
                  };
                }
                return request;
              },
            },
          },
        },
      },
      { resource: Command, options: {} },
      { resource: Client, options: {} },
      { resource: Invoice, options: {} },
    ],
    rootPath: '/admin',
  });

  const router = AdminBroExpress.buildRouter(adminBro);
  // const router = AdminBroExpress.buildAuthenticatedRouter(adminBro, {
  //   authenticate: async (email, password) => {
  //     const user = await User.findOne({ email });
  //     if (user) {
  //       const matched = await bcrypt.compare(password, user.encryptedPassword);
  //       if (matched) {
  //         return user;
  //       }
  //     }
  //     return false;
  //   },
  //   cookiePassword: 'some-secret-password-used-to-secure-cookie',
  // });

  app.use(adminBro.options.rootPath, router);
}
