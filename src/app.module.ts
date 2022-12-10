import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatModule } from './chat/chat.module';
import { validatinConfig } from './config/validation.config';

@Module({
  imports: [ConfigModule.forRoot(validatinConfig),ChatModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
