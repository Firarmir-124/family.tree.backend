import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { CallbackWithoutResultAndOptionalError } from "mongoose";
import { v4 as uuidV4 } from 'uuid';
import { DictionaryType } from "../interfaces/dictionary-type.interface";

export const DictionaryDatabaseName = 'distinct';

@Schema({
  collection: DictionaryDatabaseName,
})
export class DictionaryEntity {
  @Prop({
    type: String,
    default: uuidV4,
  })
  _id: string;

  @Prop({ enum: DictionaryType })
  type: DictionaryType;

  @Prop()
  key: string;

  @Prop()
  description: string;
}

export const DictionarySchema = SchemaFactory.createForClass(DictionaryEntity);

export type DictionaryDoc = DictionaryEntity & Document;

DictionarySchema.pre(
  'save',
  function (next: CallbackWithoutResultAndOptionalError) {
    // this.email = this.email.toLowerCase();
    // this.firstName = this.firstName.toLowerCase();
    // this.lastName = this.lastName.toLowerCase();

    next();
  },
);
