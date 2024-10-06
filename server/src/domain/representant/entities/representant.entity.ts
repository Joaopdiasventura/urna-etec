import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Document, Types } from "mongoose";
import { Class } from "../../class/entities/class.entity";
import { voteSchema } from "../../vote/entities/vote.entity";

@Schema({ versionKey: false })
export class Representant extends Document {
  @Prop()
  name: string;
  @Prop({ type: Types.ObjectId, ref: "Class" })
  class: string | Class;
}

export type representantDocument = HydratedDocument<Representant>;
export const representantSchema = SchemaFactory.createForClass(Representant);

representantSchema.pre("findOneAndDelete", async function (next) {
  try {
    const { _id } = this.getQuery();
    await this.model.db.model("Vote", voteSchema).deleteMany({
      representant: _id,
    });
    next();
  } catch (error) {
    console.error("Error while deleting price brackets", error);
    next();
  }
});
