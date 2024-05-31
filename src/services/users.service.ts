import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/users.repository';

@Injectable()
export class UserService {
  constructor(
    @Inject('API_USERS') private api_users: any[],
    private readonly userRepository: UserRepository,
  ) {}

  getUsers(): any[] {
    const dbUsers = this.userRepository.getUsers();
    const allUsers = [...dbUsers, ...this.api_users];

    return allUsers;
  }

  getUserById(id: number) {
    return this.userRepository.getUserById(id);
  }

  getUserByName(name: string) {
    return this.userRepository.getUserByName(name);
  }

  createUser(user: any) {
    return this.userRepository.createUser(user);
  }
}
