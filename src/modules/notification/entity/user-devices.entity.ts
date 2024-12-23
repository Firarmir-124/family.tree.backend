import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Base } from '../../../global/entity/base.entity';
import { ApiProperty } from '@nestjs/swagger';

@Schema()
export class UserDevices extends Base {
  @ApiProperty()
  @Prop()
  token: string;

  @ApiProperty()
  @Prop({ type: String, default: 'unknown' })
  user: string;
}
export const UserDevicesEntity = {
  name: 'UserDevice',
  schema: SchemaFactory.createForClass(UserDevices),
};
