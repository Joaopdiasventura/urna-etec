import { Module } from "@nestjs/common";
import { ClassService } from "./class.service";
import { ClassController } from "./class.controller";
import { MongoClassRepository } from "./repositories/class.mongo.repository";
import { MongooseModule } from "@nestjs/mongoose";
import { classSchema } from "./entities/class.entity";
import { CommonModule } from "../../shared/common/common.module";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: "Class", schema: classSchema }]),
        CommonModule,
    ],
    exports: [ClassService],
    controllers: [ClassController],
    providers: [
        ClassService,
        { provide: "ClassRepository", useClass: MongoClassRepository },
    ],
})
export class ClassModule {}
