import { Command } from 'src/command/entity/command.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

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

  @OneToMany(() => Command, (command) => command.client)
  commands: Command[];
}
