import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Base } from '../../../global/entity/base.entity';
import { ApiProperty } from '@nestjs/swagger';

@Schema()
export class Notification extends Base {
  @ApiProperty()
  @Prop({ type: Array })
  users: string[];

  @ApiProperty()
  @Prop({ type: String })
  title: string;

  @ApiProperty({ description: 'Сообщение' })
  @Prop({ type: String })
  message: string;
}
export const NotificationEntity = {
  name: 'Notification',
  schema: SchemaFactory.createForClass(Notification),
};
