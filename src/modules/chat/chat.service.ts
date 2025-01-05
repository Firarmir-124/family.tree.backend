import { HttpStatus, Injectable } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { ChatFront } from './chat.enum';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { OnlineUser } from './types';
import { CreateRequestDto } from './dto/create-request-dto';
import { SocketUser } from './chat.gateway';
import { WsException } from '@nestjs/websockets';
import { v4 as uuidv4 } from 'uuid';
import { FamilyTreeService } from '../familyTree/services/familyTree.service';

@Injectable()
export class ChatService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly familyTreeService: FamilyTreeService,
  ) {}

  private onlineUsers: OnlineUser[] = [];
  private roomUsers: {
    [id: string]: { id: string; name: string; owner: boolean }[];
  } = {};

  public async handleConnection(client: Socket, server: Server): Promise<void> {
    const tokenPostman =
      client.handshake.headers['authorization']?.split(' ')[1];
    const tokenUser = client.handshake.auth['authorization'];

    // if (!token) {
    //   client.disconnect();
    //   return;
    // }

    console.log('tokenPostman', tokenPostman);

    const user: OnlineUser = await this.jwtService.verifyAsync(
      !tokenPostman ? tokenUser : tokenPostman,
      {
        secret: this.configService.get('JWT_SECRET'),
      },
    );

    if (user) {
      const newUser: OnlineUser = {
        ...user,
        socketId: client.id,
        busy: false,
      };

      this.onlineUsers.push(newUser);
    }

    if (this.onlineUsers.length !== 0) {
      this.onlineUsers.forEach((item) => {
        server
          .to(item.socketId)
          .emit(ChatFront.LIST_USERS_ONLINE, this.onlineUsers);
      });
    }
  }

  public handleDisconnect(client: Socket, server: Server): void {
    const index = this.onlineUsers.findIndex(
      (item) => item.socketId === client.id,
    );

    // const checkOwner = this.roomUsers.room.some(
    //   (item) => item.id === this.onlineUsers[index]._id && item.owner === true,
    // );
    //
    // if (checkOwner) {
    //   client.to('room').emit(
    //     'ROOM',
    //     JSON.stringify({
    //       action: 'ROOM',
    //       payload: null,
    //     }),
    //   );
    //
    //   const idUsers = this.roomUsers.room.map((item) => item.id);
    //
    //   this.onlineUsers = this.onlineUsers.map((item) => {
    //     if (idUsers.includes(item._id)) {
    //       return {
    //         ...item,
    //         busy: false,
    //       };
    //     }
    //
    //     return item;
    //   });
    //
    //   this.roomUsers.room = [];
    //   server.socketsLeave('room');
    // }

    if (index !== -1) {
      this.onlineUsers.splice(index, 1);
    }

    this.onlineUsers.forEach((item) => {
      server
        .to(item.socketId)
        .emit(ChatFront.LIST_USERS_ONLINE, this.onlineUsers);
    });
  }

  public async send_message(
    client: SocketUser,
    server: Server,
    request: CreateRequestDto,
  ): Promise<any> {
    const currentUser = client.user;
    const userTo = this.onlineUsers.find(
      (item) => item._id === request.payload.toUser,
    );
    const roomName: string = uuidv4();

    this.roomUsers[roomName] = [];

    if (!userTo) {
      throw new WsException({
        codeStatus: HttpStatus.BAD_REQUEST,
        message: 'пользователь не найден',
      });
    }

    if (userTo.busy === true) {
      throw new WsException({
        codeStatus: HttpStatus.BAD_REQUEST,
        message: 'пользователь занят',
      });
    }

    const checkUserRoom = this.roomUsers[roomName].some(
      (item) => item.id === currentUser._id,
    );

    if (!checkUserRoom) {
      this.roomUsers[roomName].push({
        id: currentUser._id,
        name: currentUser.name,
        owner: true,
      });
    }

    client.to(userTo.socketId).emit(
      'REQUEST',
      JSON.stringify({
        action: 'REQUEST',
        payload: {
          message: `Пользователь ${currentUser.name} отправил вам запрос`,
          fromUser: currentUser._id,
          roomName,
        },
      }),
    );
  }

  public async accept_request(
    client: SocketUser,
    server: Server,
    request: {
      action: string;
      payload: {
        fromUser: string;
        roomName: string;
      };
    },
  ): Promise<any> {
    const { roomName } = request.payload;
    client.join(roomName);
    const currentUser = client.user;
    const fromUser = this.onlineUsers.find(
      (item) => item._id === request.payload.fromUser,
    );
    const idUsers = [currentUser._id, fromUser._id];

    if (!fromUser) {
      throw new WsException({
        codeStatus: HttpStatus.BAD_REQUEST,
        message: 'пользователь не найден',
      });
    }

    server.to(fromUser.socketId).socketsJoin(roomName);

    this.roomUsers[roomName].push({
      id: currentUser._id,
      name: currentUser.name,
      owner: false,
    });

    this.onlineUsers = this.onlineUsers.map((item) => {
      if (idUsers.includes(item._id)) {
        return { ...item, busy: true };
      }
      return item;
    });

    server.to(roomName).emit(
      'ROOM',
      JSON.stringify({
        action: 'ROOM',
        payload: {
          roomName: roomName,
          room: this.roomUsers[roomName],
          owner: request.payload.fromUser,
        },
      }),
    );
  }

  public async close_request(
    client: SocketUser,
    server: Server,
    request: {
      action: string;
      payload: {
        fromUser: string;
      };
    },
  ): Promise<any> {
    const fromUser = this.onlineUsers.find(
      (item) => item._id === request.payload.fromUser,
    );
    const currentUser = client.user;

    if (!fromUser) {
      throw new WsException({
        codeStatus: HttpStatus.BAD_REQUEST,
        message: 'пользователь не найден',
      });
    }

    // this.roomUsers.room = this.roomUsers.room.filter(
    //   (item) => item.id !== request.payload.fromUser,
    // );

    client.to(fromUser.socketId).emit(
      'MESSAGE',
      JSON.stringify({
        action: 'MESSAGE',
        payload: {
          message: `Пользователь ${currentUser.name} отклонил запрос`,
        },
      }),
    );
  }

  public async close_session(
    client: SocketUser,
    server: Server,
    request: {
      action: string;
      payload: {
        idUser: string;
        roomName: string;
      };
    },
  ): Promise<any> {
    const { roomName } = request.payload;
    const ownerRoom = this.roomUsers[roomName].find(
      (item) => item.id === request.payload.idUser,
    );
    const idUsers = this.roomUsers[roomName].map((item) => item.id);

    if (ownerRoom && ownerRoom.owner === true) {
      client.to(roomName).emit(
        'ROOM',
        JSON.stringify({
          action: 'ROOM',
          payload: null,
        }),
      );

      this.onlineUsers = this.onlineUsers.map((item) => {
        if (idUsers.includes(item._id)) {
          return {
            ...item,
            busy: false,
          };
        }

        return item;
      });

      delete this.roomUsers[roomName];
      server.socketsLeave(roomName);
    }
  }

  public async exit_room(
    client: SocketUser,
    server: Server,
    request: {
      action: string;
      payload: {
        idUser: string;
        roomName: string;
      };
    },
  ): Promise<any> {
    const { roomName } = request.payload;
    const userRoomIndex = this.roomUsers[roomName].findIndex(
      (item) => item.id === request.payload.idUser,
    );

    if (userRoomIndex !== -1) {
      client.leave(roomName);

      this.onlineUsers = this.onlineUsers.map((item) => {
        if (item._id === this.roomUsers[roomName][userRoomIndex].id) {
          return {
            ...item,
            busy: false,
          };
        }

        return item;
      });

      this.roomUsers[roomName].splice(userRoomIndex, 1);

      server.to(roomName).emit(
        'ROOM',
        JSON.stringify({
          action: 'ROOM',
          payload: {
            room: this.roomUsers[roomName],
          },
        }),
      );
    }
  }

  public async set_family(
    client: SocketUser,
    server: Server,
    request: {
      action: string;
      payload: {
        createFamily: any;
        roomName: string;
      };
    },
  ): Promise<any> {
    const { roomName, createFamily } = request.payload;

    switch (request.action) {
      case 'CREATE_FAMILY':
        await this.familyTreeService.create(createFamily, '');
        break;
      case 'CREATE_SPOUSE':
        await this.familyTreeService.createSpouse(
          createFamily,
          createFamily.familyId,
        );
        break;
      case 'UPDATE_FAMILY':
        await this.familyTreeService.update(
          createFamily.familyId,
          createFamily,
        );
        break;
      case 'REMOVE_FAMILY':
        await this.familyTreeService.remove(createFamily.familyId);
        break;
      case 'QUEUE_FAMILY':
        await this.familyTreeService.updateFamilyQueue(
          createFamily.familyId,
          createFamily,
        );
        const familyList = await this.familyTreeService.findAllFamilyTree({
          userCreated: createFamily.userCreated,
        });

        server.to(roomName).emit(
          'FAMILY_LIST',
          JSON.stringify({
            action: 'FAMILY_LIST',
            payload: {
              familyList,
            },
          }),
        );
        break;
      default:
        throw new Error(`Unsupported action: ${request.action}`);
    }

    const familyList = await this.familyTreeService.findAllFamilyTree({
      userCreated: createFamily.userCreated,
    });

    client.to(roomName).emit(
      'FAMILY_LIST',
      JSON.stringify({
        action: 'FAMILY_LIST',
        payload: {
          familyList,
        },
      }),
    );
  }
}
