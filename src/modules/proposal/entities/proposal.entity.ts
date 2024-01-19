import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { CallbackWithoutResultAndOptionalError } from "mongoose";
import { v4 as uuidV4 } from 'uuid';

export const ProposalDatabaseName = 'proposals';

@Schema({
  collection: ProposalDatabaseName,
})
export class ProposalEntity {
  @Prop({
    type: String,
    default: uuidV4,
  })
  _id: string;

  @Prop()
  id: string;

  @Prop()
  name: string;

  @Prop()
  phone: string;

  @Prop()
  description: string;

  @Prop({ default: false })
  active: boolean;

  @Prop({})
  createdAt?: Date; // Дата добавления (опционально)

  @Prop({})
  updatedAt?: Date; // Дата добавления (опционально)
}

export const ProposalSchema = SchemaFactory.createForClass(ProposalEntity);

export type ProposalDoc = ProposalEntity & Document;

ProposalSchema.pre(
  'save',
  function (next: CallbackWithoutResultAndOptionalError) {
    this.updatedAt = new Date();
    // this.email = this.email.toLowerCase();
    // this.firstName = this.firstName.toLowerCase();
    // this.lastName = this.lastName.toLowerCase();

    next();
  },
);
