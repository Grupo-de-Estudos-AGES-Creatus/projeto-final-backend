import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma.service';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { ChangePasswordDto } from './dto/changePassword.dto';

describe('AuthService', () => {
  let service: AuthService;
  let prisma: {
    user: {
      findUnique: jest.Mock;
      update: jest.Mock;
    };
  };
  let jwtService: { signAsync: jest.Mock };

  beforeEach(async () => {
    prisma = {
      user: {
        findUnique: jest.fn(),
        update: jest.fn(),
      },
    };

    jwtService = {
      signAsync: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: PrismaService, useValue: prisma },
        { provide: JwtService, useValue: jwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  describe('login', () => {
    it('should login successfully with email', async () => {
      const loginDto: LoginDto = { login: 'email@example.com', password: 'pass123' };

      prisma.user.findUnique.mockResolvedValueOnce({
        id: 1,
        password: await bcrypt.hash('pass123', 10),
        firstAcess: true,
        role: 'user',
        email: loginDto.login,
        registration: null,
      });

      jwtService.signAsync.mockResolvedValue('token');

      const result = await service.login(loginDto);

      expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { email: loginDto.login } });
      expect(jwtService.signAsync).toHaveBeenCalled();
      expect(result).toEqual({
        accessToken: 'token',
        firstAcess: true,
        role: 'user',
      });
    });

    it('should login successfully with registration', async () => {
      const loginDto: LoginDto = { login: 'reg123', password: 'pass123' };

      // First call returns null (no user with email)
      prisma.user.findUnique.mockResolvedValueOnce(null);
      // Second call returns user (registration)
      prisma.user.findUnique.mockResolvedValueOnce({
        id: 2,
        password: await bcrypt.hash('pass123', 10),
        firstAcess: false,
        role: 'admin',
        email: null,
        registration: loginDto.login,
      });

      jwtService.signAsync.mockResolvedValue('token2');

      const result = await service.login(loginDto);

      expect(prisma.user.findUnique).toHaveBeenNthCalledWith(1, { where: { email: loginDto.login } });
      expect(prisma.user.findUnique).toHaveBeenNthCalledWith(2, { where: { registration: loginDto.login } });
      expect(jwtService.signAsync).toHaveBeenCalled();
      expect(result).toEqual({
        accessToken: 'token2',
        firstAcess: false,
        role: 'admin',
      });
    });

    it('should throw ForbiddenException when user not found', async () => {
      prisma.user.findUnique.mockResolvedValue(null);

      const loginDto: LoginDto = { login: 'notfound', password: 'pass123' };

      await expect(service.login(loginDto)).rejects.toThrow('Dados inválidos');
    });

    it('should throw ForbiddenException when password does not match', async () => {
      prisma.user.findUnique.mockResolvedValue({
        id: 1,
        password: await bcrypt.hash('correctpassword', 10),
        firstAcess: true,
        role: 'user',
        email: 'email@example.com',
        registration: null,
      });

      const loginDto: LoginDto = { login: 'email@example.com', password: 'wrongpassword' };

      await expect(service.login(loginDto)).rejects.toThrow('Dados inválidos');
    });
  });

  describe('changePassword', () => {
    it('should change password successfully', async () => {
      const changePasswordDto: ChangePasswordDto = { password: 'newPassword123' };
      const currentUser = { userId: 1 };

      prisma.user.findUnique.mockResolvedValue({
        id: currentUser.userId,
        firstAcess: true,
        role: 'user',
        password: 'oldhash',
      });

      prisma.user.update.mockImplementation(async ({ where, data }) => ({
        id: where.id,
        firstAcess: data.firstAcess,
      }));

      jwtService.signAsync.mockResolvedValue('newToken');

      const result = await service.changePassword(changePasswordDto, currentUser);

      expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { id: currentUser.userId } });
      expect(prisma.user.update).toHaveBeenCalled();
      expect(jwtService.signAsync).toHaveBeenCalled();
      expect(result).toEqual({
        accessToken: 'newToken',
        firstAcess: false,
        role: 'user',
      });
    });

    it('should throw BadRequestException if user not found', async () => {
      const changePasswordDto: ChangePasswordDto = { password: 'newPassword123' };
      const currentUser = { userId: 999 };

      prisma.user.findUnique.mockResolvedValue(null);

      await expect(service.changePassword(changePasswordDto, currentUser)).rejects.toThrow("Usuário não encontrado, tente novamente");
    });

    it('should throw ForbiddenException if password already changed', async () => {
      const changePasswordDto: ChangePasswordDto = { password: 'newPassword123' };
      const currentUser = { userId: 1 };

      prisma.user.findUnique.mockResolvedValue({
        id: currentUser.userId,
        firstAcess: false,
        role: 'user',
        password: 'oldhash',
      });

      await expect(service.changePassword(changePasswordDto, currentUser)).rejects.toThrow("A senha já foi trocada");
    });
  });
});

