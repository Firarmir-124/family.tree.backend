import { User } from '../user/entities/user.entity';

export interface OnlineUser extends User {
  _id: string;
  socketId: string;
  busy: boolean;
}
