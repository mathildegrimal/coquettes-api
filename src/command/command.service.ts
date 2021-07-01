import { HttpException, HttpService } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientService } from 'src/client/client.service';
import { getRepository, Repository, UpdateResult } from 'typeorm';
import { CommandDto } from './command.dto';
import { Command } from './entity/command.entity';
import { randomBytes } from 'crypto';
import { InvoiceService } from 'src/invoice/invoice.service';
import * as PDFDocument from 'pdfkit';

import { ConfigService } from '../../config/config.service';
import * as sgMail from '@sendgrid/mail';
import * as fs from 'fs';

const PrefixInteger = (num: string, length: number) => {
  while (num.length < length) {
    num = '0' + num;
  }
  return num;
};

@Injectable()
export class CommandService {
  constructor(
    @InjectRepository(Command)
    private readonly commandRepository: Repository<Command>,
    private readonly clientService: ClientService,
    private readonly invoiceService: InvoiceService,
    private readonly httpService: HttpService,
    private configService: ConfigService, //private pdfService: PdfService,
  ) {}

  async updateDeliveryNumberCommand(
    commandid: string,
    deliveryNumber: string,
  ): Promise<UpdateResult> {
    const command = await this.commandRepository.update(commandid, {
      deliveryNumber: deliveryNumber,
    });
    return command;
  }

  async updateStatusCommand(
    commandid: string,
    status: string,
  ): Promise<UpdateResult> {
    const command = await this.commandRepository.update(commandid, {
      status: status,
    });
    return command;
  }

  async getAllCommands(): Promise<Command[]> {
    return await this.commandRepository.find({
      order: { date: 'DESC' },
      relations: ['client', 'invoice'],
    });
  }

  async getOneCommand(commandid: string): Promise<Command> {
    const command = await this.commandRepository.findOne({
      where: { id: commandid },
      relations: ['client', 'invoice'],
    });
    if (!command) {
      throw new HttpException('Not found', 404);
    }
    return command;
  }

  async getCommandByInvoice(invoiceId: string): Promise<Command> {
    const command = await this.commandRepository.findOne({
      where: { invoice: { id: invoiceId } },
      relations: ['client', 'invoice'],
    });
    if (!command) {
      throw new HttpException('Not found', 404);
    }
    return command;
  }

  async getAllCommandsByClientId(clientid: string): Promise<Command[]> {
    const commands = await this.commandRepository.find({
      client: { id: clientid },
    });

    if (!commands) {
      throw new HttpException('Not found', 404);
    }
    return commands;
  }

  async postCommand(command: CommandDto): Promise<Command> {
    const amount = command.amount / 100;

    const generateOrderNumber = async () => {
      const orderNumber = randomBytes(5).toString('hex').toUpperCase();
      const commandCheck = await this.commandRepository.findOne({
        where: { orderNumber },
      });
      if (commandCheck != undefined) {
        generateOrderNumber();
        return;
      }
      return orderNumber;
    };
    const orderNumber = await generateOrderNumber();

    //génération de la facture et du n° de facture
    const number = await this.generateInvoice(new Date(command.date), amount);
    const invoice = await this.invoiceService.getInvoiceByNumber(number);

    //statut : en attente de dépôt
    const status = 'en attente de dépôt';

    //importer service client pour rechercher client en bdd et le mettre dans le save
    const client = await this.clientService.getClientById(command.client);

    //génération étiquette (service etiquette, call axios avec xml);
    const deliveryNumber = 'null';

    const newCommand = this.commandRepository.create({
      ...command,
      amount,
      client,
      orderNumber,
      status,
      deliveryNumber,
      invoice,
    });
    await this.commandRepository.save(newCommand);

    await this.sendInvoiceMail(invoice.id);

    return newCommand;
  }

  async generateInvoice(date: Date, amount: number) {
    //génération de la facture et du n° de facture
    const billString = 'FA';

    const year = date.getFullYear().toString();

    let order;
    const maxOrder = await this.invoiceService.getMaxOrderInvoiceByYear(year);
    if (maxOrder.max === null) {
      order = PrefixInteger('1', 6);
    } else {
      const newOrder = maxOrder.max + 1;
      order = PrefixInteger(newOrder.toString(), 6);
    }
    const number = billString + order + '-' + year;
    await this.invoiceService.postInvoice({ order, year, number, amount });
    return number;
  }

  async generatePDFInvoice(invoiceId: string): Promise<Buffer> {
    const command = await this.getCommandByInvoice(invoiceId);
    const pdfBuffer: Buffer = await new Promise((resolve) => {
      const doc = new PDFDocument({
        size: 'LETTER',
        bufferPages: true,
      });
      console.log(command.products);
      doc.pipe(
        fs.createWriteStream(
          `src/command/invoices/${command.invoice.number}.pdf`,
        ),
      );
      doc.font('Helvetica');

      // customize your PDF document
      doc.image('upload/les-coquettes-de-sete-logo-1604067800.jpeg', 0, 15, {
        width: 300,
      });
      doc.text('Facture n°' + command.invoice.number, 100, 100);
      doc.text('Les Coquettes de Sète', 350, 100, {
        link: 'https://lescoquettesdesete.fr',
      });
      doc
        .fillColor('blue')
        .text('lescoquettesdesete.fr', 350, 125, {
          link: 'https://lescoquettesdesete.fr',
          underline: true,
        })
        .fillColor('black');
      doc.text(
        command.client.firstname + ' ' + command.client.lastname,
        100,
        150,
      );
      doc.text(command.adress, 100, 175);
      doc.text(command.zipcode + ' ' + command.city, 100, 200);

      doc.text('Date : ' + command.date.toLocaleDateString(), 100, 250);
      let line = 300;

      doc.text('Ref. Produit', 100, line);
      doc.text('Quantité', 200, line);
      doc.text('Prix Unitaire', 300, line);
      doc.text('Total', 400, line);

      line = 325;
      let total = 0;

      for (const product of command.products) {
        doc.text(product.datoId, 100, line);
        doc.text(product.quantity.toString(), 200, line);
        doc.text((product.amount / 100).toString() + ' €', 300, line);
        const amount = (product.quantity * product.amount) / 100;
        doc.text(amount.toString() + ' €', 400, line);
        line += 20;
        total += product.quantity * product.amount;
      }

      doc.text('Total : ' + total / 100 + ' € T.T.C.', 100, 500);

      doc.end();

      const buffer = [];
      doc.on('data', buffer.push.bind(buffer));
      doc.on('end', () => {
        const data = Buffer.concat(buffer);
        resolve(data);
      });
    });

    return pdfBuffer;
  }

  async sendInvoiceMail(invoiceId: string): Promise<any> {
    const SENDGRID_KEY = this.configService.get('SENDGRID_API_KEY');
    const SENDER = this.configService.get('SENDGRID_SENDER');
    const TEMPLATE = this.configService.get('SENDGRID_INVOICE_TEMPLATE');

    await this.generatePDFInvoice(invoiceId);
    const command = await this.getCommandByInvoice(invoiceId);

    sgMail.setApiKey(SENDGRID_KEY);

    const pathToInvoice = `src/command/invoices/${command.invoice.number}.pdf`;
    const invoiceToSend = fs.readFileSync(pathToInvoice).toString('base64');
    const msg = {
      to: command.client.email,
      from: SENDER,
      subject: 'Sending with SendGrid is Fun',
      text: 'and easy to do anywhere, even with Node.js',
      html: '<strong>and easy to do anywhere, even with Node.js</strong>',
      attachments: [
        {
          content: invoiceToSend,
          filename: `${command.invoice.number}.pdf`,
          type: 'application/pdf',
          disposition: 'attachment',
        },
      ],
      personalizations: [
        {
          to: [{ email: command.client.email, name: 'Mathilde Grimal' }],
          dynamic_template_data: {
            client: {
              lastname: command.client.lastname,
              firstname: command.client.firstname,
            },
            command: {
              orderNumber: command.orderNumber,
              adress: command.adress,
              zipcode: command.zipcode,
              city: command.city,
            },
          },
        },
      ],
      template_id: TEMPLATE,
    };

    sgMail
      .send(msg)
      .then(() => {
        console.log('Email sent');
      })
      .catch((error) => {
        console.error(error);
      });
  }

  async getStatusCode(): Promise<any> {
    const URL = this.configService.get('URL_API_LAPOSTE');
    const OKAPI_KEY = this.configService.get('OKAPI_SANDBOX_KEY');

    const lg = 'lang=fr_FR';
    const commands = await this.commandRepository.find({
      relations: ['client'],
    });

    for (const command of commands) {
      if (command.deliveryNumber != 'null') {
        this.httpService
          .get(`${URL}${command.deliveryNumber}?${lg}`, {
            headers: {
              // eslint-disable-next-line prettier/prettier
              Accept: 'application/json',
              'X-Okapi-Key': OKAPI_KEY,
            },
          })
          .subscribe(
            (response) => {
              const code = response.data.shipment.event[0].code;

              //code DR1 : en attente de dépôt à la poste
              if (code != command.status && code != 'DR1') {
                this.updateStatusCommand(command.id, code);
                const mailInfos = this.getMailInfos(command, code);
                this.sendStatusMail(mailInfos);
              }
            },
            (error) => {
              const errorMessage =
                'Erreur ' +
                error.response.data.returnCode +
                ' : ' +
                error.response.data.returnMessage;
              console.log(errorMessage);
            },
          );
      } else {
        console.log('pas de numéro de livraison');
      }
    }
  }

  async sendStatusMail(mailInfos: any): Promise<any> {
    const SENDGRID_KEY = this.configService.get('SENDGRID_API_KEY');
    const SENDER = this.configService.get('SENDGRID_SENDER');
    const TEMPLATE = this.configService.get('SENDGRID_TEMPLATE');

    sgMail.setApiKey(SENDGRID_KEY);

    const msg = {
      to: mailInfos.email,
      from: SENDER,
      subject: 'Sending with SendGrid is Fun',
      text: 'and easy to do anywhere, even with Node.js',
      html: '<strong>and easy to do anywhere, even with Node.js</strong>',
      personalizations: [
        {
          to: [{ email: mailInfos.email, name: 'Mathilde Grimal' }],
          dynamic_template_data: {
            client: {
              lastname: mailInfos.lastname,
              firstname: mailInfos.firstname,
            },
            command: {
              orderNumber: mailInfos.orderNumber,
              deliveryNumber: mailInfos.deliveryNumber,
              adress: mailInfos.adress,
              zipcode: mailInfos.zipCode,
              city: mailInfos.city,
              message: mailInfos.message,
            },
          },
        },
      ],
      template_id: TEMPLATE,
    };

    sgMail
      .send(msg)
      .then(() => {
        console.log('Email sent');
      })
      .catch((error) => {
        console.error(error.response.body);
      });
  }

  public getMailInfos(command: any, code: string): Record<string, string> {
    let message = '';
    switch (code) {
      case 'ET1':
        message =
          'a été expédié et vous sera livré le plus rapidement possible';
        break;
      case 'AG1':
        message = 'vous a été livré !';
        break;
      case 'DI1':
        message =
          "est disponible dans votre point de retrait pendant un délai de 10 jours ouvrables. Ne tardez pas à aller le chercher ! Il vous sera remis sur présentation d'une pièce d'identité.";
        break;
      default:
        break;
    }
    const mailInfos = {
      orderNumber: command.orderNumber,
      deliveryNumber: command.deliveryNumber,
      adress: command.adress,
      zipcode: command.zipcode,
      city: command.city,
      message: message,
      email: command.client.email,
      lastname: command.client.lastname,
      firstname: command.client.firstname,
    };
    return mailInfos;
  }

  async getTotalCommandsByDay(): Promise<any> {
    const date = new Date();
    date.setMonth(date.getMonth() - 6);

    const commandEvolutionAmountAndCount = await getRepository(Command)
      .createQueryBuilder('command')
      .orderBy(`DATE_TRUNC('month', command.date)`)
      .select('COUNT(*)', 'count')
      .addSelect('SUM(amount)', 'amount')
      .addSelect(`DATE_TRUNC('month', command.date)`, 'dateMonth')
      .where('command.date > :start_at', {
        start_at: date,
      })
      .groupBy(`DATE_TRUNC('month', command.date)`)
      .getRawMany();

    const datas = {
      evolution: commandEvolutionAmountAndCount,
    };
    return datas;
  }
}
