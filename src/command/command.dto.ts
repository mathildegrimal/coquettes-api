import { Client } from 'src/client/entity/client.entity';

export class CommandDto {
  readonly id: number;
  readonly date: string;
  readonly status: string;
  readonly amount: number;
  readonly billNumber: number;
  readonly client: Client;
  readonly deliveryNumber: number;
}
