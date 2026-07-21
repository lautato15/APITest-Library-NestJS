import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(name: string, password: string) {
    console.log('ACA');
    console.log(name, typeof name, password, typeof password);
    const user = await this.prisma.user.findUnique({
      where: {
        name,
      },
    });
    if (!user || user.password !== password) {
      throw new UnauthorizedException('Credenciales inválidas');
    }
    const payload = {
      sub: user.id,
      name: user.name,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
