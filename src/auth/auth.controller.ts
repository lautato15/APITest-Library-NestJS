import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth/login')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  create(@Body() loginDto: any) {
    return this.authService.login(loginDto.name, loginDto.password);
  }
}
