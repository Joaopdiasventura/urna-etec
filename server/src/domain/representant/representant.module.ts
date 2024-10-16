import { Module } from "@nestjs/common";
import { RepresentantService } from "./representant.service";
import { RepresentantController } from "./representant.controller";
import { MongoRepresentantRepository } from "./repositories/representant.mongo.repository";
import { MongooseModule } from "@nestjs/mongoose";
import { representantSchema } from "./entities/representant.entity";
import { ClassModule } from "../class/class.module";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: "Representant", schema: representantSchema },
        ]),
        ClassModule,
    ],
    exports: [RepresentantService],
    controllers: [RepresentantController],
    providers: [
        RepresentantService,
        {
            provide: "RepresentantRepository",
            useClass: MongoRepresentantRepository,
        },
    ],
})
export class RepresentantModule {}
