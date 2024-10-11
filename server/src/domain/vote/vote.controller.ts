import { Controller, Get, Post, Body } from "@nestjs/common";
import { VoteService } from "./vote.service";
import { CreateVoteDto } from "./dto/create-vote.dto";

@Controller("vote")
export class VoteController {
    constructor(private readonly voteService: VoteService) {}

    @Post()
    async create(@Body() createVoteDto: CreateVoteDto) {
        await this.voteService.create(createVoteDto);
        return { message: "Voto realizado com sucesso" };
    }

    @Get()
    findAll() {
        return this.voteService.findAll();
    }
}
