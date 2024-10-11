import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateVoteDto } from "../dto/create-vote.dto";
import { Vote } from "../entities/vote.entity";
import { VoteRepository } from "./vote.repository";

export class MongoVoteRepository implements VoteRepository {
    constructor(@InjectModel("Vote") private readonly voteModel: Model<Vote>) {}

    async create(createVoteDto: CreateVoteDto): Promise<Vote> {
        return await this.voteModel.create(createVoteDto);
    }

    async findAll(): Promise<Vote[]> {
        return this.voteModel
            .find()
            .populate([
                {
                    path: "representant",
                    populate: { path: "class" },
                },
                { path: "board" },
            ])
            .exec();
    }
}
