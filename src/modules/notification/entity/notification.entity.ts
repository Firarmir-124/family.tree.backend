import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Base } from '../../../global/entity/base.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { User } from '../../user/entities/user.entity';

@Schema()
export class Notification extends Base {
  @ApiProperty()
  @Prop({ type: Types.ObjectId, ref: User.name, required: false })
  user: Types.ObjectId;

  @ApiProperty({ description: 'Сообщение' })
  @Prop({ type: String })
  message: string;
}
export const NotificationEntity = {
  name: 'Notification',
  schema: SchemaFactory.createForClass(Notification),
};
