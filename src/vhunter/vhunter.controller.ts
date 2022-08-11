import { Controller, Get } from '@nestjs/common';

@Controller('vhunter')
export class VhunterController {
  @Get('/')
  versionado(): string {
    return '1.0.6';
  }
}
