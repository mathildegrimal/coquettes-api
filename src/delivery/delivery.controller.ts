import { Controller, Get } from '@nestjs/common';
import { DeliveryService } from './delivery.service';

@Controller('delivery')
export class DeliveryController {
  constructor(private deliveryService: DeliveryService) {}

  @Get('/all')
  async xml() {
    const result = await this.deliveryService.xml();
    return result;
  }
}
