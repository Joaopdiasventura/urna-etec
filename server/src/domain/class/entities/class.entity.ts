import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Document } from "mongoose";
import { representantSchema } from "../../representant/entities/representant.entity";
import { voteSchema } from "../../vote/entities/vote.entity";

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

classSchema.pre("findOneAndDelete", async function (next) {
  try {
    const { _id } = this.getQuery();

    (
      await this.model.db
        .model("Representant", representantSchema)
        .find({ class: _id })
    ).forEach(
      async (rep) =>
        await this.model.db.model("Vote", voteSchema).deleteMany({
          representant: rep.id,
        }),
    );

    await this.model.db.model("Representant", representantSchema).deleteMany({
      class: _id,
    });

    next();
  } catch (error) {
    console.error("Error while deleting representatives and votes", error);
    next(error);
  }
});
