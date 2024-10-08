import { Module } from "@nestjs/common";
import { ClassService } from "./class.service";
import { ClassController } from "./class.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { classSchema } from "./entities/class.entity";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "Class", schema: classSchema }]),
  ],
  exports: [ClassService],
  controllers: [ClassController],
  providers: [ClassService],
})
export class ClassModule {}
