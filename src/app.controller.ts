import { Post } from '@nestjs/common';
import { Req } from '@nestjs/common';
import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  findAll(): string {
    return 'This action returns all cats';
  }

  @Post('/github')
  toto(@Req() request: Request) {
    console.log(request.body);
  }
}
