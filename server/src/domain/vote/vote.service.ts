import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { CreateVoteDto } from "./dto/create-vote.dto";
import { Vote } from "./entities/vote.entity";
import { VoteGateway } from "../../shared/websockets/vote/vote.gateway";
import { VoteRepository } from "./repositories/vote.repository";
import { BoardService } from "../board/board.service";
import { RepresentantService } from "../representant/representant.service";

@Injectable()
export class VoteService {
    constructor(
        @Inject("VoteRepository")
        private readonly voteRepository: VoteRepository,
        private readonly representantService: RepresentantService,
        private readonly boardService: BoardService,
        private readonly voteGateway: VoteGateway,
    ) {}

    async create(createVoteDto: CreateVoteDto): Promise<void> {
        await this.existRepresentant(createVoteDto.representant);
        await this.existBoard(createVoteDto.board);
        const vote: Vote = await this.voteRepository.create(createVoteDto);
        this.voteGateway.broadcastVoteCreated(vote);
    }

    async findAll(): Promise<Vote[]> {
        return this.voteRepository.findAll();
    }

    async existRepresentant(id: string) {
        await this.representantService.findById(id);
    }

    async existBoard(id: string) {
        await this.boardService.findById(id);
    }
}
