import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity()
export class Invoice extends BaseEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({
    nullable: false,
  })
  order: number;

  @ApiProperty()
  @Column({
    nullable: false,
  })
  year: string;

  @ApiProperty()
  @Column({
    nullable: false,
  })
  number: string;

  @ApiProperty()
  @Column({
    nullable: true,
  })
  amount: number;
}
