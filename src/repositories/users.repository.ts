import { Injectable } from '@nestjs/common';

interface User {
  id: number | undefined;
  name: string;
  email: string;
}

@Injectable()
export class UserRepository {
  private users = [
    {
      id: 1,
      name: 'Pepito',
      email: 'pepi@mail.com',
    },
    {
      id: 2,
      name: 'Pepita',
      email: 'pepa@mail.com',
    },
    {
      id: 3,
      name: 'Mimis',
      email: 'mindy@mail.com',
    },
  ];

  getUsers() {
    return this.users;
  }

  getUserById(id: number) {
    return this.users.find((user) => user.id === id);
  }

  getUserByName(name: string) {
    return this.users.find((user) => user.name === name);
  }

  createUser(user: User) {
    const id = this.users.length + 1;
    this.users = [...this.users, { id, ...user }];
    return this.users;
  }
}
