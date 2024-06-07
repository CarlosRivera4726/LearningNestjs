import { Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { from, map } from 'rxjs';

@Injectable()
export class ChatService {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  create(createChatDto: CreateChatDto) {
    return 'This action adds a new chat';
  }

  findAll() {
    return from([1, 2, 3]).pipe(
      map((item) => ({ event: 'events', data: item })),
    );
  }

  findOne(id: number) {
    return `This action returns a #${id} chat`;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(id: number, updateChatDto: UpdateChatDto) {
    return `This action updates a #${id} chat`;
  }

  remove(id: number) {
    return `This action removes a #${id} chat`;
  }
}
