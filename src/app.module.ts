import { Module } from '@nestjs/common';
import { LibraryModule } from './library/library.module';
import { AppController } from './app.controller';
import { PrismaService } from './prisma.service';

@Module({
  imports: [LibraryModule, PrismaService],
  controllers: [AppController],
})
export class AppModule {}
