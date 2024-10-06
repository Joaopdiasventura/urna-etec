import { Module } from "@nestjs/common";
import { VoteService } from "./vote.service";
import { VoteController } from "./vote.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { voteSchema } from "./entities/vote.entity";
import { RepresentantModule } from "../representant/representant.module";
import { BoardModule } from "../board/board.module";
import { WebsocketsModule } from "../../shared/websockets/websockets.module";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "Vote", schema: voteSchema }]),
    RepresentantModule,
    BoardModule,
    WebsocketsModule,
  ],
  controllers: [VoteController],
  providers: [VoteService],
})
export class VoteModule {}
