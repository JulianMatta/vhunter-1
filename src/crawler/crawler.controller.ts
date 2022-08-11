import { Controller } from '@nestjs/common';
import { CrawlerService } from './crawler.service';

@Controller('crawler')
export class CrawlerController {
    constructor(private crawlerService: CrawlerService) {
        this.crawlerService.executeCron();
        this.crawlerService.executeCron2();
        this.crawlerService.executeCron3();
        this.crawlerService.executeCron4();
    }
}
