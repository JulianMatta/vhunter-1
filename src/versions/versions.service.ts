import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateVersionDto } from './dto/create-versions-dto';
import { Versions } from './dto/versions.entity';
import { VersionsRepository } from './versions.repository';

@Injectable()
export class VersionsService {
  constructor(
    @InjectRepository(VersionsRepository)
    private versionsRepository: VersionsRepository,
  ) { }

  create(createVersionDto: CreateVersionDto): Promise<Versions> {
    return this.versionsRepository.createVersion(createVersionDto);
  }

  async getAllVersions(): Promise<Versions[]> {
    const found = await this.versionsRepository.find();
    if (!found) {
      throw new NotFoundException(`Versions 'NOT FOUND`);
    }
    return found;
  }

  async getLastVersion(componentID: string): Promise<string> {
    const found = await this.versionsRepository.find({ where: { componentID }, order: { versionDate: 'DESC' } });
    if (found.length === 0) {
      return '0';
    }
    return found[0].versionCode;
  }

  async getLastVersionAndDate(componentID: string): Promise<{ versionCode: string, versionDate: Date }> {
    const found = await this.versionsRepository.find({ where: { componentID }, order: { versionDate: 'DESC' } });
    if (found.length === 0) {
      throw new NotFoundException(`Versions 'NOT FOUND`);
    }
    return { versionCode: found[0].versionCode, versionDate: found[0].versionDate };
  }
}
