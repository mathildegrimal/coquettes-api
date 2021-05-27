import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
//import { ClientDto } from './client.dto';
import { Client } from './entity/client.entity';
import { ClientService } from './client.service';
//import { ClientDto } from './client.dto';
//import { CreateItemDto } from './ItemDto.dto';
import Stripe from 'stripe';

const calculateOrderAmount = (items) => {
  let total = 0;
  for (const element of items) {
    total += element.quantity * element.amount;
  }
  return total;
};

const stripe = new Stripe(
  'sk_test_51IjM41CE0ZMoSikaUiafL9FyLNrpm2E4mSAWxZYz0F0ouDiQ3OkObZ4BOadmMRxBu17yDD0YZKYyYW6gDOtAlvlT00U2s7hpbR',
  {
    apiVersion: '2020-08-27',
  },
);

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Get('all')
  public getCommands(): Promise<Client[]> {
    return this.clientService.getClients();
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.clientService.remove(id);
  }

  @Delete('delete/email/:email')
  removeByEmail(@Param('email') email: string) {
    return this.clientService.removeByEmail(email);
  }

  @Get(':id')
  public getClientById(@Param('id') id: string) {
    return this.clientService.getClientById(id);
  }
  @Post('/new')
  postClient(@Body('data') data: any) {
    console.log(data);
  }

  @Post('/create-payment-intent')
  async paymentIntent(@Body() data: any) {
    console.log("creation d'un paiement intent");

    //capitalize infos client
    for (const property in data.client) {
      data.client[property] = data.client[property].toUpperCase();
    }
    //vérifier si client est en bdd
    const client = await this.clientService.getClientByInfos(
      data.client.firstname,
      data.client.lastname,
      data.client.email,
    );
    let idClient = '';
    if (!client) {
      await this.clientService.postClient(data.client);
      const newclient = await this.clientService.getClientByInfos(
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
      });

      const clientSecret = paymentIntent.client_secret;

      //renvoi le client secret et l'email pour le reçu
      return {
        idclient: idClient,
        clientSecret: clientSecret,
      };
    }
  }
}
