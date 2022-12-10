import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat } from './chat.entity';
import { ChatGatway } from './chat.gatway';
import { ChatService } from './chat.service';

@Module({
    imports:[TypeOrmModule.forFeature([Chat])],
    providers: [ChatGatway,ChatService]
})
export class ChatModule {}
