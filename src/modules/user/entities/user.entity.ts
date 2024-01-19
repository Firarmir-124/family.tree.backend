import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { CallbackWithoutResultAndOptionalError, Document } from 'mongoose';
import { v4 as uuidV4 } from 'uuid';

export const UserDatabaseName = 'users';

@Schema({
  collection: UserDatabaseName,
})
export class UserEntity {
  @Prop({
    type: String,
    default: uuidV4,
  })
  _id: string;

  @Prop({
    sparse: true,
    index: true,
    trim: true,
    type: String,
    unique: true,
    maxlength: 100,
  })
  username?: string;

  @Prop({
    index: true,
    lowercase: true,
    trim: true,
    type: String,
    maxlength: 50,
  })
  firstName: string;

  @Prop({
    index: true,
    lowercase: true,
    trim: true,
    type: String,
    maxlength: 50,
  })
  lastName: string;

  @Prop()
  description: string;

  @Prop()
  category: string;

  @Prop()
  email: string;

  @Prop({
    sparse: true,
    trim: true,
    type: String,
    maxlength: 15,
  })
  mobileNumber?: string;

  @Prop({
    type: String,
  })
  password: string;

  @Prop({
    default: 0,
    type: Number,
  })
  passwordAttempt: number;

  @Prop({
    type: String,
  })
  salt: string;

  @Prop({
    required: true,
    default: true,
    index: true,
    type: Boolean,
  })
  isActive: boolean;

  @Prop({
    type: String,
  })
  department: string;

  @Prop({
    default: false,
    index: true,
    type: Boolean,
  })
  inactivePermanent: boolean;

  @Prop({
    type: Date,
  })
  inactiveDate?: Date;

  @Prop({
    default: false,
    index: true,
    type: Boolean,
  })
  blocked: boolean;

  @Prop({})
  position: string;

  @Prop({
    required: false,
    type: Date,
  })
  blockedDate?: Date;

  @Prop({
    required: false,
    type: Date,
  })
  createdAt?: Date;

  @Prop({
    required: false,
    type: Date,
  })
  updatedAt?: Date;

  @Prop({
    required: false,
  })
  photo?: string;
}

export const UserSchema = SchemaFactory.createForClass(UserEntity);

export type UserDoc = UserEntity & Document;

UserSchema.pre('save', function (next: CallbackWithoutResultAndOptionalError) {
  this.username = (this.username || '').toLowerCase();
  this.email = (this.email || '').toLowerCase();
  this.updatedAt = new Date();
  // this.firstName = (this.firstName || '').toLowerCase();
  // this.lastName = (this.lastName || '').toLowerCase();

  next();
});
