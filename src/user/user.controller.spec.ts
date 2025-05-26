import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  const mockUserService = {
    findAll: jest.fn().mockResolvedValue([{ id: 1, username: 'mocked' }]),
    findOne: jest.fn().mockResolvedValue({ id: 1, username: 'mocked' }),
    create: jest.fn().mockResolvedValue({ id: 1, username: 'created' }),
    update: jest.fn().mockResolvedValue({ id: 1, username: 'updated' }),
    remove: jest.fn().mockResolvedValue('Usuário deletado'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [{ provide: UserService, useValue: mockUserService }],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  it('should return all users', async () => {
    const result = await controller.findAll();
    expect(result).toEqual([{ id: 1, username: 'mocked' }]);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should get user by id', async () => {
    const result = await controller.findOne(1);
    expect(result).toEqual({ id: 1, username: 'mocked' });
    expect(service.findOne).toHaveBeenCalledWith(1);
  });

  it('should create a user', async () => {
    const dto = { username: 'created', password: '123' } as any;
    const result = await controller.create(dto);
    expect(result).toEqual({ id: 1, username: 'created' });
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('should delete a user', async () => {
    const result = await controller.remove(1);
    expect(result).toBe('Usuário deletado');
    expect(service.remove).toHaveBeenCalledWith(1);
  });
});
