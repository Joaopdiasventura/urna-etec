import { Injectable } from "@nestjs/common";
import { CreateVoteDto } from "./dto/create-vote.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Vote } from "./entities/vote.entity";
import { Model } from "mongoose";
import { VoteGateway } from "../../shared/websockets/vote/vote.gateway";

@Injectable()
export class VoteService {
  constructor(
    @InjectModel(Vote.name) private readonly voteModel: Model<Vote>,
    private readonly voteGateway: VoteGateway
  ) {}

  async create(createVoteDto: CreateVoteDto): Promise<void> {
    const vote: Vote = await this.voteModel.create(createVoteDto);
    this.voteGateway.broadcastVoteCreated(vote);
  }

  async findAll(): Promise<Vote[]> {
    return this.voteModel.find().populate([
      {
        path: "representant",
        populate: { path: "class" },
      },
      { path: "board" },
    ]);
  }
}
