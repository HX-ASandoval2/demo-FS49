import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { UsersDbService } from './users-db.service'; //ruta absoluta
import { User } from '../entities/user.entity'; //ruta relativa

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(async () => {
    const mockUsersService: Partial<UsersDbService> = {
      findByEmail: () => Promise.resolve(undefined),
      create: (user: Partial<User>): Promise<User> =>
        Promise.resolve({
          ...user,
          isAdmin: false,
          id: '18b2bb94-7b3e-40a4-904d-b68a524e1ce8',
        } as User),
    };

    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        JwtService,
        { provide: UsersDbService, useValue: mockUsersService },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  it('Create an instance of AuthService', async () => {
    expect(authService).toBeDefined();
  });

  const mockUser: Partial<User> = {
    name: 'Pepita',
    createdAt: '18/04/2024',
    password: 'pass123',
    email: 'pepi@mail.com',
  };

  it('signUp() creates a new user with an encripted password',
   async () => {
    const user = await authService.signUp(mockUser as User)

    // console.log(user);
    
    expect(user).toBeDefined()
    expect(user.password).not.toEqual(mockUser.password)
  })

  
});
