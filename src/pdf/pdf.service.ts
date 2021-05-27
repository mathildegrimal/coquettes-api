import { Injectable } from '@nestjs/common';
import * as PDFDocument from 'pdfkit';
import { CommandService } from 'src/command/command.service';
//import { InvoiceService } from 'src/invoice/invoice.service';
import * as fs from 'fs';

@Injectable()
export class PdfService {
  constructor() {} //private commandService: CommandService, //private invoiceService: InvoiceService,

  async generatePDF(invoiceId: string): Promise<Buffer> {
    //const invoice = await this.invoiceService.getInvoiceById(invoiceId);
    //const command = await this.commandService.getCommandByInvoice(invoiceId);

    const pdfBuffer: Buffer = await new Promise((resolve) => {
      const doc = new PDFDocument({
        size: 'LETTER',
        bufferPages: true,
      });
      // doc.pipe(
      //   fs.createWriteStream(`upload/invoices/${command.invoice.number}.pdf`),
      // );
      // doc.font('Helvetica');

      // // customize your PDF document
      // doc.image('upload/les-coquettes-de-sete-logo-1604067800.jpeg', 0, 15, {
      //   width: 300,
      // });
      // doc.text('Facture n°' + command.invoice.number, 100, 100);
      // doc.text('Les Coquettes de Sète', 350, 100, {
      //   link: 'https://lescoquettesdesete.fr',
      // });
      // doc
      //   .fillColor('blue')
      //   .text('lescoquettesdesete.fr', 350, 125, {
      //     link: 'https://lescoquettesdesete.fr',
      //     underline: true,
      //   })
      //   .fillColor('black');
      // doc.text(
      //   command.client.firstname + ' ' + command.client.lastname,
      //   100,
      //   150,
      // );
      // doc.text(command.client.adress, 100, 175);
      // doc.text(command.zipcode + ' ' + command.city, 100, 200);

      // doc.text('Date : ' + command.date.toLocaleDateString(), 100, 250);
      // doc.text('Total : ' + command.invoice.amount + ' € T.T.C.', 100, 275);

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
}
