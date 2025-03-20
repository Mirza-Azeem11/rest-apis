import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { ConfigService } from '@nestjs/config';
import { RegisterUserDto } from './dto/registration.dto';
import { AuthDto } from './dto/auth.dto';

describe('AuthController', () => {
    let controller: AuthController;
    let service: AuthService;
    let userService: UserService;

    const mockUser = { id: 1, email: 'test@example.com', password: 'hashedPassword' };

    const mockAuthService = {
        login: jest.fn(async (dto) => {
            if (dto.email !== 'test@example.com' || dto.password !== 'correctpassword') {
                return Promise.reject(new Error('Invalid email/password'));
            }
            return {
                status: 200,
                message: 'Logged in successfully. ✔️',
                data: { ...mockUser, access_token: 'jwt_token' },
            };
        }),
        registration: jest.fn(async (dto) => {
            if (dto.email === 'test@example.com') {
                return Promise.reject(new Error('User already exists'));
            }
            return {
                status: 201,
                data: { ...mockUser, access_token: 'jwt_token' },
            };
        }),
    };

    const mockUserService = {
        getByUserByEmail: jest.fn(async (email) => (email === 'test@example.com' ? mockUser : null)),
        register: jest.fn().mockResolvedValue(mockUser),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AuthController],
            providers: [
                { provide: AuthService, useValue: mockAuthService },
                { provide: UserService, useValue: mockUserService },
                { provide: JwtService, useValue: {} },
                { provide: ConfigService, useValue: {} },
            ],
        }).compile();

        controller = module.get<AuthController>(AuthController);
        service = module.get<AuthService>(AuthService);
        userService = module.get<UserService>(UserService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('should login successfully', async () => {
        const loginDto = new AuthDto();
        loginDto.email = 'test@example.com';
        loginDto.password = 'correctpassword';

        await expect(controller.login(loginDto)).resolves.toEqual(
            expect.objectContaining({ status: 200 })
        );
        expect(service.login).toHaveBeenCalledWith(loginDto);
    });

    it('should fail login with invalid credentials', async () => {
        const loginDto = new AuthDto();
        loginDto.email = 'wrong@example.com';
        loginDto.password = 'wrongpassword';

        await expect(controller.login(loginDto)).rejects.toThrow('Invalid email/password');
    });

    it('should register a new user', async () => {
        const registerDto = new RegisterUserDto();
        registerDto.email = 'new@example.com';
        registerDto.password = 'Password@12';
        registerDto.firstName = 'John';
        registerDto.lastName = 'Doe';

        await expect(controller.register(registerDto)).resolves.toEqual(
            expect.objectContaining({ status: 201 })
        );
        expect(service.registration).toHaveBeenCalledWith(registerDto);
    });

    it('should fail registration if user already exists', async () => {
        const registerDto = new RegisterUserDto();
        registerDto.email = 'test@example.com';
        registerDto.password = 'password';
        registerDto.firstName = 'Jane';
        registerDto.lastName = 'Doe';

        await expect(controller.register(registerDto)).rejects.toThrow('User already exists');
    });

    it('should hash the password correctly', async () => {
        const password = 'mypassword';
        const hashedPassword = await bcrypt.hash(password, 10);
        expect(await bcrypt.compare(password, hashedPassword)).toBe(true);
    });
});
