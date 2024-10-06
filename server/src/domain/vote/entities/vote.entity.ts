import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, HydratedDocument, Types } from "mongoose";
import { Representant } from "../../representant/entities/representant.entity";
import { Board } from "../../board/entities/board.entity";

@Schema({ versionKey: false })
export class Vote extends Document {
  @Prop({ default: Date.now() })
  createdAt: Date;
  @Prop({ type: Types.ObjectId, ref: "Representant" })
  representant: string | Representant;
  @Prop({ type: Types.ObjectId, ref: "Board" })
  board: string | Board;
}

export type voteDocument = HydratedDocument<Vote>;
export const voteSchema = SchemaFactory.createForClass(Vote);
