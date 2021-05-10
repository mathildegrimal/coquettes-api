import { Client } from 'src/client/entity/client.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Command {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
  })
  orderNumber: string;

  @Column({
    nullable: false,
    type: 'date',
  })
  date: string;

  @Column({ nullable: false })
  status: string;

  @Column({ nullable: false, type: 'float' })
  amount: number;

  @Column({
    nullable: false,
  })
  billNumber: number;

  @Column({
    nullable: false,
  })
  deliveryNumber: number;

  @ManyToOne(() => Client, (client) => client.commands)
  client: Client;
}
