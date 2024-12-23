import { Base } from '../../../global/entity/base.entity';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User extends Base {
  @ApiProperty()
  @Prop({ type: String, required: false })
  address: string;

  @ApiProperty()
  @Prop({ type: String, required: false })
  phone: string;

  @ApiProperty()
  @Prop({ type: String, required: false })
  city: string;

  @ApiHideProperty()
  @Prop({ type: String, required: true })
  password: string;

  @ApiProperty()
  @Prop({ type: String, required: true })
  email: string;

  @ApiHideProperty()
  @Prop({ type: String })
  salt: string;
}

export const UserEntity = {
  name: 'User',
  schema: SchemaFactory.createForClass(User),
};
UserEntity.schema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret.password;
    delete ret.salt;
    return ret;
  },
});
