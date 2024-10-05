import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, HydratedDocument } from "mongoose";

@Schema({ versionKey: false })
export class Board extends Document {
  @Prop()
  name: string;
  @Prop()
  president: string;
}

export type boardDocument = HydratedDocument<Board>;
export const boardSchema = SchemaFactory.createForClass(Board);
