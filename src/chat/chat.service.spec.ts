import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import exp from 'constants';
import { Chat } from './chat.entity';
import { ChatService } from './chat.service';

describe('ChatService', () => {
  let service: ChatService;

  const MockUsersRepository = {
    find: jest.fn(() => {
      return [{
        message: 'hello',
        sender: 'Tom',
        recipient: 'sara',
        id: 1
      }]
    }),
    create: jest.fn().mockImplementation(chat => chat),
    save: jest.fn().mockImplementation(chat => Promise.resolve({ id: Math.floor(Math.random() * 1000), ...chat }))
  }
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChatService,
        {
          provide: getRepositoryToken(Chat),
          useValue: MockUsersRepository
        }
      ],
    }).compile();

    service = module.get<ChatService>(ChatService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new chat record and return chat', async () => {
    let chat: Chat = { message: 'hello', recipient: 'sara', sender: 'sam' }
    expect(await service.saveChat(chat)).toEqual({
      id: expect.any(Number),
      ...chat
    })
    expect(MockUsersRepository.create).toHaveBeenCalledWith(chat)
    expect(MockUsersRepository.save).toHaveBeenCalledWith(chat)
  })

  it('should return all chats', async () => {
    let result = await service.getChats();
    expect(result).toHaveLength(1);
    expect(result).toContainEqual(expect.objectContaining({
      id: expect.any(Number),
      message: expect.any(String),
      recipient: expect.any(String),
      sender: expect.any(String)
    })
    )
    expect(MockUsersRepository.find).toHaveBeenCalled()
  })
});
