import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { PrismaService } from '../prisma.service';

describe('UserService', () => {
  let service: UserService;
  let prisma: PrismaService;

  const mockPrisma = {
    user: {
      findMany: jest.fn().mockResolvedValue([{ id: 1, username: 'test' }]),
      findUnique: jest.fn().mockResolvedValue({ id: 1, username: 'test' }),
      create: jest.fn().mockResolvedValue({ id: 1, username: 'test' }),
      update: jest.fn().mockResolvedValue({ id: 1, username: 'updated' }),
      delete: jest.fn().mockResolvedValue({ id: 1 }),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should return all users', async () => {
    const users = await service.findAll();
    expect(users).toEqual([{ id: 1, username: 'test' }]);
    expect(prisma.user.findMany).toHaveBeenCalled();
  });

  it('should return one user by id', async () => {
    const user = await service.findOne(1);
    expect(user).toEqual({ id: 1, username: 'test' });
  });

  it('should create a user', async () => {
    const dto = { username: 'test', password: '123', role: 'USER' };
    jest.spyOn<any, any>(require('bcrypt'), 'hash').mockResolvedValue('hashed');

    const created = await service.create({ ...dto } as any);
    expect(created).toEqual({ id: 1, username: 'test' });
  });
});
