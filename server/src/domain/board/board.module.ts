import { Module } from "@nestjs/common";
import { BoardService } from "./board.service";
import { BoardController } from "./board.controller";
import { MongoBoardRepository } from "./repositories/board.mongo.repository";
import { MongooseModule } from "@nestjs/mongoose";
import { boardSchema } from "./entities/board.entity";
import { CommonModule } from "../../shared/common/common.module";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: "Board", schema: boardSchema }]),
        CommonModule,
    ],
    exports: [BoardService],
    controllers: [BoardController],
    providers: [
        BoardService,
        { provide: "BoardRepository", useClass: MongoBoardRepository },
    ],
})
export class BoardModule {}
