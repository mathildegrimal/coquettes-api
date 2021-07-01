import { ApiProperty } from '@nestjs/swagger';
import { Command } from 'src/command/entity/command.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  BaseEntity,
} from 'typeorm';

@Entity()
export class Client extends BaseEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({
    nullable: false,
  })
  firstname: string;

  @ApiProperty()
  @Column({
    nullable: false,
  })
  lastname: string;

  @ApiProperty()
  @Column({
    nullable: false,
  })
  adress: string;

  @ApiProperty()
  @Column({
    nullable: false,
  })
  email: string;

  @ApiProperty()
  @Column({
    nullable: true,
    type: 'timestamp',
  })
  created_at: Date;

  @ApiProperty()
  @Column({
    nullable: true,
  })
  tel: string;

  @ApiProperty({ type: () => Command })
  @OneToMany(() => Command, (command: Command) => command.client)
  commands: Command[];
}
