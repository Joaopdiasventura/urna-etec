import { Module } from "@nestjs/common";
import { VoteService } from "./vote.service";
import { VoteController } from "./vote.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Vote, voteSchema } from "./entities/vote.entity";
import { RepresentantModule } from "../representant/representant.module";
import { BoardModule } from "../board/board.module";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Vote.name, schema: voteSchema }]),
    RepresentantModule,
    BoardModule,
  ],
  controllers: [VoteController],
  providers: [VoteService],
})
export class VoteModule {}
