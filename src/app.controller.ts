import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service.js';
import got from 'got';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello() {
    const res = await got.get('https://www.baidu.com').text();
    console.log('debug', res);
    return 'Hello World!';
  }
}
