import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { TestModule } from './test/test.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [PrismaModule, TestModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
