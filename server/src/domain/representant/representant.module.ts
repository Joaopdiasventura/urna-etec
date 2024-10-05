import { Module } from "@nestjs/common";
import { RepresentantService } from "./representant.service";
import { RepresentantController } from "./representant.controller";
import { MongooseModule } from "@nestjs/mongoose";
import {
  Representant,
  representantSchema,
} from "./entities/representant.entity";
import { ClassModule } from "../class/class.module";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Representant.name, schema: representantSchema },
    ]),
    ClassModule,
  ],
  exports: [RepresentantService],
  controllers: [RepresentantController],
  providers: [RepresentantService],
})
export class RepresentantModule {}
