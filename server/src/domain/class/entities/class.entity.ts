import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Document } from "mongoose";

@Schema({ versionKey: false })
export class Class extends Document {
  @Prop()
  course: string;
  @Prop()
  year: string;
  @Prop()
  period: string;
}

export type classDocument = HydratedDocument<Class>;
export const classSchema = SchemaFactory.createForClass(Class);
