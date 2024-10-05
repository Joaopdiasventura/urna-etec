import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Document, Types } from "mongoose";
import { Class } from "../../class/entities/class.entity";

@Schema({ versionKey: false })
export class Representant extends Document {
  @Prop()
  name: string;
  @Prop({ type: Types.ObjectId, ref: Class.name })
  class: string | Class;
}

export type representantDocument = HydratedDocument<Representant>;
export const representantSchema = SchemaFactory.createForClass(Representant);
