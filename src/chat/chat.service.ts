import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Chat } from './chat.entity';

@Injectable()
export class ChatService {


    constructor(@InjectRepository(Chat) private readonly chatRepository: Repository<Chat>) { }

    async getChats(): Promise<Chat[]> {
        return await this.chatRepository.find();
    }


    async saveChat(chat: Chat): Promise<Chat> {
        try {
            const createdChat = this.chatRepository.create(chat);
            return await this.chatRepository.save(createdChat)
        } catch (e) {
            console.log(e)
        }

    }

}
