import { User } from './entities/user.entity';
export interface IUser extends User {
  _id: string;
}
