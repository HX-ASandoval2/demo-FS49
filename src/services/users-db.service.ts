import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersDbService {
  constructor(
    @InjectRepository(User) private userDBRepository: Repository<User>,
  ) {}

  async create(user: any) {
    console.log(user);

    return await this.userDBRepository.save(user);
  }

  async getUserById(id: string) {
    return await this.userDBRepository.findOneBy({ id });
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userDBRepository.findOneBy({ email: email });
  }
}
