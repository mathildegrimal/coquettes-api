import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Invoice {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    nullable: false,
  })
  order: number;

  @Column({
    nullable: false,
  })
  year: string;

  @Column({
    nullable: false,
  })
  number: string;

  @Column({
    nullable: true,
  })
  amount: number;
}
