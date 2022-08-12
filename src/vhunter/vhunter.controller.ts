import { Controller, Get } from '@nestjs/common';

@Controller('vhunter')
export class VhunterController {
  @Get('/')
  versionado(): string {
    // sacarlo del packjson
    /*  import fs from "fs";
var json = JSON.parse(fs.readFileSync("package.json", "utf8"));
console.log(json.version);*/
    return '1.0.11';
  }
  @Get('/ping')
  ping(): string {
    return 'pong';
  }
}
