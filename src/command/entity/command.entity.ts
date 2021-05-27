import { Client } from 'src/client/entity/client.entity';
import { Invoice } from 'src/invoice/entity/invoice.entity';

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';

export class CommandProduct {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    nullable: false,
  })
  datoId: string;

  @Column({
    nullable: false,
  })
  quantity: number;

  @Column({
    nullable: false,
  })
  amount: number;
}

@Entity()
export class Command {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    nullable: false,
  })
  orderNumber: string;

  @Column({
    nullable: false,
    type: 'timestamptz',
  })
  date: Date;

  @Column({ nullable: false })
  status: string;

  @Column({ nullable: false, type: 'float' })
  amount: number;

  @Column({
    nullable: true,
  })
  deliveryNumber: string;

  @Column({
    nullable: false,
  })
  adress: string;

  @Column({
    nullable: false,
  })
  zipcode: string;

  @Column({
    nullable: false,
  })
  city: string;

  @ManyToOne(() => Client, (client) => client.commands)
  @JoinColumn()
  client: Client;

  @OneToOne(() => Invoice)
  @JoinColumn()
  invoice: Invoice;

  @Column({ type: 'json', array: false, default: [], nullable: false })
  products: CommandProduct[];
}
