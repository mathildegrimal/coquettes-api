import { HttpException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from './entity/client.entity';

import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SK_TEST, {
  apiVersion: '2020-08-27',
});

const calculateOrderAmount = (items) => {
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
    // if (!client) {
    //   throw new HttpException('Not found', 404);
    // }
    return client;
  }

  async postClient(data: any): Promise<any> {
    console.log("creation d'un paiement intent");

    //capitalize infos client
    for (const property in data.client) {
      data.client[property] = data.client[property].toUpperCase();
    }
    //vérifier si client est en bdd
    const client = await this.getClientByInfos(
      data.client.firstname,
      data.client.lastname,
      data.client.email,
    );

    let idClient = '';
    const date = new Date();
    if (!client) {
      await this.clientRepository.save({ ...data.client, date: date });
      const newclient = await this.getClientByInfos(
        data.client.firstname,
        data.client.lastname,
        data.client.email,
      );
      idClient = newclient.id;
    } else {
      idClient = client.id;
    }
    //si oui
    //creation du payment intent de stripe
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

      //renvoie le client secret et l'email pour le reçu
      return {
        idclient: idClient,
        clientSecret: clientSecret,
      };
    }
  }

  async remove(id: string): Promise<void> {
    await this.clientRepository.delete(id);
  }
  async removeByEmail(email: string): Promise<void> {
    await this.clientRepository.delete({ email: email });
  }
}
