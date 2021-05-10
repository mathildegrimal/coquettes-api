import { HttpService, Post } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { Req } from '@nestjs/common';
import { Controller, Get } from '@nestjs/common';
import { Request } from 'express';
import { AppService } from './app.service';
import { MessageDto } from './message.dto';

@Controller()
export class AppController {
  constructor(private http: HttpService) {}

  @Get()
  findAll(): string {
    return 'This action returns all cats';
  }

  @Post('/github')
  toto(@Req() request: Request) {
    const name = request.body.head_commit.author.name;
    const message = request.body.head_commit.message;
    const repo = request.body.repository.name;
    const date = request.body.head_commit.timestamp;

    const discord =
      'le ' +
      date +
      ' push de ' +
      ' ' +
      name +
      ' sur le repo ' +
      repo +
      ' - message du commit : ' +
      message;

    return this.http
      .post(
        'https://discord.com/api/webhooks/841432524526059590/qkSb1Hv08-2HpNceveLZZrXFnUDrVlMDmsVt4ehPaBSbLTP_hv1VHZ2iw0H5oIwXrTqc',
        { content: discord },
      )
      .subscribe((res) => {
        console.log(res);
      });
  }
  @Get('/test')
  test(): string {
    return 'This action returns a test';
  }

  @Post('/test')
  createMessage(@Req() request: Request) {
    const n = 'MAthilde';
    const mess = 'test';
    const r = 'api-nest';
    const d = '2021-05-10T23:46:34+02:00';
    const m =
      'le ' +
      d +
      ' push de ' +
      ' ' +
      n +
      ' sur le repo ' +
      r +
      ' - message du commit : ' +
      mess;

    return this.http
      .post(
        'https://discord.com/api/webhooks/841432524526059590/qkSb1Hv08-2HpNceveLZZrXFnUDrVlMDmsVt4ehPaBSbLTP_hv1VHZ2iw0H5oIwXrTqc',
        { content: m },
      )
      .subscribe((res) => {
        console.log(res);
      });
  }
}
