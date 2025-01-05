import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/guards/auth.guard';
import { ChatBack } from './chat.enum';
import { CreateRequestDto } from './dto/create-request-dto';
import { IUser } from '../user/types';
import { CreateFamilyDto } from '../familyTree/dto/create-family.dto';

export interface SocketUser extends Socket {
  user: IUser;
}

@WebSocketGateway({
  namespace: '/api/v1',
  cors: {
    origin: '*',
  },
})
export class ChatGateway {
  constructor(private readonly chatService: ChatService) {}

  @WebSocketServer()
  server: Server;

  private async handleConnection(client: Socket): Promise<void> {
    await this.chatService.handleConnection(client, this.server);
  }

  private handleDisconnect(client: Socket): void {
    this.chatService.handleDisconnect(client, this.server);
  }

  @UseGuards(AuthGuard)
  @SubscribeMessage(ChatBack.SEND_MESSAGE)
  public async send_request(
    @MessageBody()
    request: CreateRequestDto,
    @ConnectedSocket() client: SocketUser,
  ) {
    return this.chatService.send_message(client, this.server, request);
  }

  @UseGuards(AuthGuard)
  @SubscribeMessage('ACCEPT_REQUEST')
  public async accept_request(
    @MessageBody()
    request: {
      action: string;
      payload: {
        fromUser: string;
        roomName: string;
      };
    },
    @ConnectedSocket() client: SocketUser,
  ) {
    return this.chatService.accept_request(client, this.server, request);
  }

  @UseGuards(AuthGuard)
  @SubscribeMessage('CLOSE_REQUEST')
  public async close_request(
    @MessageBody()
    request: {
      action: string;
      payload: {
        fromUser: string;
      };
    },
    @ConnectedSocket() client: SocketUser,
  ) {
    return this.chatService.close_request(client, this.server, request);
  }

  @UseGuards(AuthGuard)
  @SubscribeMessage('CLOSE_SESSION')
  public async close_session(
    @MessageBody()
    request: {
      action: string;
      payload: {
        idUser: string;
        roomName: string;
      };
    },
    @ConnectedSocket() client: SocketUser,
  ) {
    return this.chatService.close_session(client, this.server, request);
  }

  @UseGuards(AuthGuard)
  @SubscribeMessage('EXIT_ROOM')
  public async exit_room(
    @MessageBody()
    request: {
      action: string;
      payload: {
        idUser: string;
        roomName: string;
      };
    },
    @ConnectedSocket() client: SocketUser,
  ) {
    return this.chatService.exit_room(client, this.server, request);
  }

  @UseGuards(AuthGuard)
  @SubscribeMessage('SET_FAMILY')
  public async set_family(
    @MessageBody()
    request: {
      action: string;
      payload: {
        createFamily: CreateFamilyDto;
        roomName: string;
      };
    },
    @ConnectedSocket() client: SocketUser,
  ) {
    return this.chatService.set_family(client, this.server, request);
  }
}
