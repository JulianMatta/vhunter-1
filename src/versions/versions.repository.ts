import { Repository } from 'typeorm';
import { CustomRepository } from '../databaseCustomRepository/typeorm-ex.decorator';
import { CreateVersionDto } from './dto/create-versions-dto';
import { Versions } from './dto/versions.entity';

@CustomRepository(Versions)
export class VersionsRepository extends Repository<Versions> {
  async createVersion(createVersionDto: CreateVersionDto): Promise<Versions> {
    const { componentID, productID, versionCode } = createVersionDto;
    const versionDate = new Date(Date.UTC(new Date().getUTCFullYear(), new Date().getUTCMonth(), new Date().getUTCDate(), new Date().getHours(), new Date().getUTCMinutes(), new Date().getUTCSeconds()));
    const version = this.create({
      componentID,
      productID,
      versionCode,
      versionDate,
    });

    await this.save(version);
    return version;
  }
}
