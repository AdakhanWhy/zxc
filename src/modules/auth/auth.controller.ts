import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiTags('API')
  @ApiResponse({ status: 201, type: CreateUserDto })
  @Post('register')
  registerUser(@Body() createUserDto: CreateUserDto): Promise<CreateUserDto> {
    return this.authService.registerUser(createUserDto);
  }

  @ApiTags('API')
  @ApiResponse({ status: 200, type: LoginDto })
  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.loginUser(loginDto);
  }

  @Post('test')
  @UseGuards(JwtAuthGuard)
  test() {
    return true;
  }
}
