import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatModule } from './chat/chat.module';
import { typeOrmAsync } from './config/typeOrm.config';
import { validatinConfig } from './config/validation.config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync(typeOrmAsync),
    ConfigModule.forRoot(validatinConfig),
    ChatModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
