import { Injectable } from "@nestjs/common";
import { CreateVoteDto } from "./dto/create-vote.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Vote } from "./entities/vote.entity";
import { Model } from "mongoose";

@Injectable()
export class VoteService {
  constructor(
    @InjectModel(Vote.name) private readonly voteModel: Model<Vote>,
  ) {}

  async create(createVoteDto: CreateVoteDto): Promise<void> {
    await this.voteModel.create(createVoteDto);
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
