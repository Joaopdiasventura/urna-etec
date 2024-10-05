import { Module } from "@nestjs/common";
import { BoardService } from "./board.service";
import { BoardController } from "./board.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Board, boardSchema } from "./entities/board.entity";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Board.name, schema: boardSchema }]),
  ],
  exports: [BoardService],
  controllers: [BoardController],
  providers: [BoardService],
})
export class BoardModule {}
