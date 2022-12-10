import { Bind, Logger } from "@nestjs/common";
import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway } from "@nestjs/websockets";
import { NestGateway } from "@nestjs/websockets/interfaces/nest-gateway.interface";
import { Chat } from "./chat.entity";
import { ChatEnum } from "./chat.enum";
import { ChatModule } from "./chat.module";
import { ChatService } from "./chat.service";

@WebSocketGateway()
export class ChatGatway implements NestGateway {
    private readonly logger = new Logger(ChatModule.name);
    constructor(private chatService: ChatService) { }

    afterInit(server: any) {
        this.logger.log('Init chat server')
    }

    async handleConnection(socket: any) {
        socket.emit(ChatEnum.ALL_CHAT, await this.chatService.getChats())
    }

    handleDisconnect(socket: any) {
        console.log('socket disconnected')
    }

    @Bind(MessageBody(), ConnectedSocket())
    @SubscribeMessage(ChatEnum.CHAT_EVENT)
    handleNewMessage(chat: Chat, sender: any) {
        this.chatService.saveChat(chat)
        sender.emit(ChatEnum.NEW_MESSAGE_EVENT, chat)
        sender.broadcast.emit(ChatEnum.NEW_MESSAGE_EVENT, chat)
    }

}