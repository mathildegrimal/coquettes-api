import { Command } from 'src/command/entity/command.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Client {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    nullable: false,
  })
  firstname: string;

  @Column({
    nullable: false,
  })
  lastname: string;

  @Column({
    nullable: false,
  })
  adress: string;

  @Column({
    nullable: false,
  })
  email: string;

  @OneToMany(() => Command, (command: Command) => command.client)
  commands: Command[];
}
