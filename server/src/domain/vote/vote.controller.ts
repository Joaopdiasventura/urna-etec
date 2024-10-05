import { Controller, Get, Post, Body, NotFoundException } from "@nestjs/common";
import { VoteService } from "./vote.service";
import { CreateVoteDto } from "./dto/create-vote.dto";
import { RepresentantService } from "../representant/representant.service";
import { BoardService } from "../board/board.service";

@Controller("vote")
export class VoteController {
  constructor(
    private readonly voteService: VoteService,
    private readonly representantService: RepresentantService,
    private readonly boardService: BoardService,
  ) {}

  @Post()
  async create(@Body() createVoteDto: CreateVoteDto) {
    await this.existRepresentant(createVoteDto.representant);
    await this.existBoard(createVoteDto.board);
    await this.voteService.create(createVoteDto);
    return { message: "Voto realizado com sucesso" };
  }

  @Get()
  findAll() {
    return this.voteService.findAll();
  }

  async existRepresentant(id: string) {
    const representant = await this.representantService.findById(id);
    if (!representant) throw new NotFoundException("Sala não encontrada");
  }

  async existBoard(id: string) {
    const board = await this.boardService.findById(id);
    if (!board) throw new NotFoundException("Chapa não encontrada");
  }
}
