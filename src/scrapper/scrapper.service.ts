/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as puppeteer from 'puppeteer';
import { VersionsRepository } from 'src/versions/versions.repository';
import { CreateVersionDto } from '../versions/dto/create-versions-dto';
import { Versions } from '../versions//dto/versions.entity';

@Injectable()
export class ScrapperService {
  constructor(
    @InjectRepository(VersionsRepository)
    private versionsRepository: VersionsRepository,
  ) { }

  create(createVersionDto: CreateVersionDto): Promise<Versions> {
    return this.versionsRepository.createVersion(createVersionDto);
  }

  selectorComponentType(url: string, componentType: string) {
    switch (componentType) {
      case "WEB":
        return this.WebPublic(url);
      case "PLAYSTORE":
        return this.PlayStoreGoogle(url);
      default:
        return new NotFoundException('Component Type not found');
    }
  }

  // view-source:https://web.flow.com.ar/auth/v2/revision
  // view-source:https://flow.com.ar/
  async WebPublic(URL: string): Promise<string> {

    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disabled-setupid-sandbox"]
    });
    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(0);
    await page.goto(`view-source:${URL}`, {
      waitUntil: 'networkidle2',
    });
    const results = await page.evaluate(() => {
      const lineas = document.body.innerText.split('\n');
      return lineas[1];
    });
    await browser.close();
    return results;
  }

  // https://play.google.com/store/apps/details?id=ar.com.personal
  async PlayStoreGoogle(URL: string): Promise<string> {
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disabled-setupid-sandbox"]
    });
    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(0);//0
    await page.goto(URL, {
      waitUntil: 'networkidle2',
    });
    await page.click('.VMq4uf button');
    await page.waitForTimeout(3000);//1000
    const results = await page.evaluate(() => {
      const dataVersion = document.querySelector('.reAt0')?.textContent;
      return dataVersion;
    });
    await browser.close();
    return results;
  }
}
