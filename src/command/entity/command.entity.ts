import { ApiProperty } from '@nestjs/swagger';
import { Client } from 'src/client/entity/client.entity';
import { Invoice } from 'src/invoice/entity/invoice.entity';

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
  BaseEntity,
} from 'typeorm';

export class CommandProduct {
  @ApiProperty()
  @Column({
    nullable: false,
  })
  datoId: string;

  @ApiProperty()
  @Column({
    nullable: false,
  })
  quantity: number;

  @ApiProperty()
  @Column({
    nullable: false,
  })
  amount: number;
}

@Entity()
export class Command extends BaseEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({
    nullable: false,
  })
  orderNumber: string;

  @ApiProperty()
  @Column({
    nullable: false,
    type: 'timestamptz',
  })
  date: Date;

  @ApiProperty()
  @Column({ nullable: false })
  status: string;

  @ApiProperty()
  @Column({ nullable: false, type: 'float' })
  amount: number;

  @ApiProperty()
  @Column({
    nullable: true,
  })
  deliveryNumber: string;

  @ApiProperty()
  @Column({
    nullable: true,
  })
  transport: string;

  @ApiProperty()
  @Column({
    nullable: false,
  })
  adress: string;

  @ApiProperty()
  @Column({
    nullable: false,
  })
  zipcode: string;

  @ApiProperty()
  @Column({
    nullable: false,
  })
  city: string;

  @ApiProperty({ type: () => Client })
  @ManyToOne(() => Client, (client) => client.commands)
  @JoinColumn()
  client: Client;

  @ApiProperty({ type: () => Invoice })
  @OneToOne(() => Invoice)
  @JoinColumn()
  invoice: Invoice;

  @ApiProperty()
  @Column({ type: 'json', array: false, default: [], nullable: false })
  products: CommandProduct[];
}
