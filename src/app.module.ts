import { Module } from '@nestjs/common';
import { LibraryModule } from './library/library.module';
import { AppController } from './app.controller';
import { PrismaService } from './prisma.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    LibraryModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [PrismaService],
})
export class AppModule {}
