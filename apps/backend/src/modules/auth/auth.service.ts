import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from '../../common/types/jwt-payload';
import { UsersRepository } from '../users/users.repository';
import { AuthRepository } from './auth.repository';
import { LoginDto } from './dto/login.dto';
import { RefreshDto } from './dto/refresh.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  private get accessSecret() {
    return this.configService.get<string>('JWT_ACCESS_SECRET', 'emergencia60-access-secret');
  }

  private get refreshSecret() {
    return this.configService.get<string>('JWT_REFRESH_SECRET', 'emergencia60-refresh-secret');
  }

  private get accessExpiresIn() {
    return this.configService.get<string>('JWT_ACCESS_EXPIRES_IN', '15m');
  }

  private get refreshExpiresIn() {
    return this.configService.get<string>('JWT_REFRESH_EXPIRES_IN', '30d');
  }

  private async issueTokens(user: { id: string; email: string; role: string }) {
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    const accessToken = await this.jwtService.signAsync(payload as any, {
      secret: this.accessSecret,
      expiresIn: this.accessExpiresIn as any,
    } as any);

    const refreshToken = await this.jwtService.signAsync(payload as any, {
      secret: this.refreshSecret,
      expiresIn: this.refreshExpiresIn as any,
    } as any);

    return { accessToken, refreshToken };
  }

  async login(loginDto: LoginDto) {
    const user = await this.usersRepository.findByEmailWithPassword(loginDto.email);

    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const tokens = await this.issueTokens(user);
    const refreshTokenHash = await bcrypt.hash(tokens.refreshToken, 10);

    await this.authRepository.updateRefreshToken(user.id, refreshTokenHash);

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      ...tokens,
    };
  }

  async refresh(refreshDto: RefreshDto) {
    try {
      const payload = await this.jwtService.verifyAsync<JwtPayload>(refreshDto.refreshToken, {
        secret: this.refreshSecret,
      });

      const user = await this.authRepository.findUserById(payload.sub);

      if (!user || !user.refreshTokenHash) {
        throw new UnauthorizedException('Refresh token inválido');
      }

      const isTokenValid = await bcrypt.compare(refreshDto.refreshToken, user.refreshTokenHash);

      if (!isTokenValid) {
        throw new UnauthorizedException('Refresh token inválido');
      }

      const tokens = await this.issueTokens(user);
      const refreshTokenHash = await bcrypt.hash(tokens.refreshToken, 10);

      await this.authRepository.updateRefreshToken(user.id, refreshTokenHash);

      return tokens;
    } catch {
      throw new UnauthorizedException('Refresh token inválido');
    }
  }
}
