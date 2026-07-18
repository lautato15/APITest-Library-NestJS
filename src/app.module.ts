import { Module } from '@nestjs/common';
import { LibraryModule } from './library/library.module';
import { AppController } from './app.controller';
import { TestModule } from './test/test.module';

@Module({
  imports: [LibraryModule, TestModule],
  controllers: [AppController],
})
export class AppModule {}
