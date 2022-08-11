/* eslint-disable prettier/prettier */
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { CustomRepository } from '../databaseCustomRepository/typeorm-ex.decorator';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './dto/user.entity';
import * as bcrypt from 'bcrypt';

@CustomRepository(User)
export class UsersRepository extends Repository<User> {
  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;
    //HASH DE PASSWORD ANTES DE GUARDARLO CON BCRYPT
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = this.create({ username, password: hashedPassword });
    try {
      this.save(user);
    } catch (error) {
      if (error.code === '23505') {
        //EN POSTGRES SI TIRA ERROR DE CODIGO 2305 ->USUARIO DUPLICADO,EL NUMERO LO TOMA COMO UN STRING
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
