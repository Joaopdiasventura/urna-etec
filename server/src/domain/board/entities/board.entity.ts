import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, HydratedDocument } from "mongoose";
import { voteSchema } from "../../vote/entities/vote.entity";

@Schema({ versionKey: false })
export class Board extends Document {
  @Prop()
  name: string;
  @Prop()
  president: string;
}

export type boardDocument = HydratedDocument<Board>;
export const boardSchema = SchemaFactory.createForClass(Board);

boardSchema.pre("findOneAndDelete", async function (next) {
  try {
    const { _id } = this.getQuery();
    await this.model.db.model("Vote", voteSchema).deleteMany({
      board: _id,
    });
    next();
  } catch (error) {
    console.error("Error while deleting price brackets", error);
    next();
  }
});
