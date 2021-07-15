import { HttpException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from './entity/client.entity';

import Stripe from 'stripe';

//fonction pour calculer le total de la commande
const calculateOrderAmount = (items: any) => {
  let total = 0;
  for (const element of items) {
    total += element.quantity * element.amount;
  }
  return total;
};

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
  ) {}

  async getClients(): Promise<Client[]> {
    return this.clientRepository.find({
      order: { created_at: 'DESC' },
      relations: ['commands', 'commands.invoice'],
    });
  }

  async getClientById(id: string): Promise<Client> {
    const client = await this.clientRepository.findOne({ id });
    if (!client) {
      throw new HttpException('Not found', 404);
    }
    return client;
  }

  async getClientByInfos(
    firstname: string,
    lastname: string,
    email: string,
  ): Promise<Client> {
    const client = await this.clientRepository.findOne({
      where: { firstname, lastname, email },
    });

    return client;
  }

  async postClient(data: any): Promise<any> {
    for (const property in data.client) {
      data.client[property] = data.client[property].toUpperCase();
    }

    const client = await this.getClientByInfos(
      data.client.firstname,
      data.client.lastname,
      data.client.email,
    );

    let idClient = '';

    if (!client) {
      const date = new Date();
      await this.clientRepository.save({ ...data.client, created_at: date });
      const newclient = await this.getClientByInfos(
        data.client.firstname,
        data.client.lastname,
        data.client.email,
      );
      idClient = newclient.id;
    } else {
      idClient = client.id;
    }

    const stripe = new Stripe(process.env.STRIPE_SK_TEST, {
      apiVersion: '2020-08-27',
    });

    if (data.items) {
      const items = data.items;
      const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateOrderAmount(items),
        currency: 'eur',
        statement_descriptor: 'Custom descriptor',
        metadata: {
          order_id: '6735',
        },
      });

      const clientSecret = paymentIntent.client_secret;

      return {
        idclient: idClient,
        clientSecret: clientSecret,
      };
    }
  }
}
