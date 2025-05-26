import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ChangePasswordDto } from './dto/changePassword.dto';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const mockAuthService = {
      login: jest.fn(),
      changePassword: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });

  describe('login', () => {
    it('should call authService.login with LoginDto and return result', async () => {
      const loginDto: LoginDto = { login: 'user', password: 'pass' };
      const result = { accessToken: 'token', firstAcess: false, role: 'user' };

      jest.spyOn(authService, 'login').mockResolvedValue(result);

      expect(await authController.login(loginDto)).toBe(result);
      expect(authService.login).toHaveBeenCalledWith(loginDto);
    });
  });

  describe('changePassword', () => {
    it('should call authService.changePassword with ChangePasswordDto and currentUser and return result', async () => {
      const changePasswordDto: ChangePasswordDto = {
        password: 'newpass',  // só password, sem newPassword
      };
      const currentUser = { userId: 1 }; // corresponde ao que o controller espera
      const result = { 
        accessToken: 'token', 
        firstAcess: false, 
        role: 'user' 
      };

      jest.spyOn(authService, 'changePassword').mockResolvedValue(result);

      expect(await authController.changePassword(changePasswordDto, currentUser)).toBe(result);
      expect(authService.changePassword).toHaveBeenCalledWith(changePasswordDto, currentUser);
    });
  });
});
