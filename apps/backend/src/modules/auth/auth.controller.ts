import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RefreshDto } from './dto/refresh.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({
    summary: 'Realizar login',
    description:
      'Autentica um usuário usando email e senha, retornando um token JWT para acesso à API.',
  })
  @ApiCreatedResponse({
    description:
      'Login realizado com sucesso. Retorna access_token (JWT) e refresh_token.',
    schema: {
      example: {
        access_token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VyLWlkIiwiaWF0IjoxNjc2NTAwMDAwfQ.signature',
        refresh_token: 'refresh-token-value',
        user: {
          id: 'user-id',
          email: 'user@example.com',
          name: 'User Name',
        },
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Email ou senha inválidos',
  })
  @ApiUnauthorizedResponse({
    description: 'Credenciais incorretas',
  })
  async login(@Body() loginDto: LoginDto): Promise<any> {
    return await this.authService.login(loginDto);
  }

  @Post('refresh')
  @ApiOperation({
    summary: 'Renovar token de acesso',
    description: 'Gera um novo access_token usando um refresh_token válido.',
  })
  @ApiCreatedResponse({
    description: 'Token renovado com sucesso',
    schema: {
      example: {
        access_token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VyLWlkIiwiaWF0IjoxNjc2NTAwMDAwfQ.signature',
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: 'Refresh token inválido ou expirado',
  })
  async refresh(@Body() refreshDto: RefreshDto): Promise<any> {
    return await this.authService.refresh(refreshDto);
  }
}
