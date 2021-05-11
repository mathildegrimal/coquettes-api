import { HttpService, Post } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { Req } from '@nestjs/common';
import { Controller, Get } from '@nestjs/common';
import { Request } from 'express';

@Controller()
export class AppController {
  constructor(private http: HttpService) {}

  @Get()
  findAll(): string {
    return 'This action returns all cats';
  }

  @Post('/github')
  async discordMessage(@Req() request: Request) {
    const name = request.body.head_commit.author.name;
    const message = request.body.head_commit.message;
    const repo = request.body.repository.name;
    const dateDate = request.body.head_commit.timestamp;

    const discord =
      'Le ' +
      dateDate +
      ', push de ' +
      ' ' +
      name +
      ' sur le repository ' +
      repo +
      ' - message du commit : ' +
      message;

    await this.http
      .post(
        'https://discord.com/api/webhooks/841432524526059590/qkSb1Hv08-2HpNceveLZZrXFnUDrVlMDmsVt4ehPaBSbLTP_hv1VHZ2iw0H5oIwXrTqc',
        {
          content: discord,
          embeds: [
            {
              title: 'Un exemple de super titre',
              description: 'Ici, le corps du texte...',
              url: 'https://zestedesavoir.com/on-peut-aussi-mettre-une-url',
              timestamp: date,
              author: { name: 'Mathilde' },
            },
          ],
        },
      )
      .subscribe(() => {
        return 'message envoyé';
      });
  }
  @Get('/test')
  test(): string {
    return 'This action returns a test';
  }
}
