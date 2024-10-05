import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
} from "@nestjs/common";
import { BoardService } from "./board.service";
import { CreateBoardDto } from "./dto/create-board.dto";
import { UpdateBoardDto } from "./dto/update-board.dto";

@Controller("board")
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Post()
  async create(@Body() createBoardDto: CreateBoardDto) {
    await this.boardService.create(createBoardDto);
    return { message: "Chapa adicionada com sucesso" };
  }

  @Get()
  async findAll() {
    return await this.boardService.findAll();
  }

  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body() updateBoardDto: UpdateBoardDto,
  ) {
    await this.existBoard(id);
    await this.boardService.update(id, updateBoardDto);
    return { message: "Chapa atualizada com sucesso" };
  }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    await this.existBoard(id);
    await this.boardService.remove(id);
    return { message: "Chapa deletada com sucesso" };
  }

  async existBoard(id: string) {
    const board = await this.boardService.findById(id);
    if (!board) throw new NotFoundException("Chapa não encontrada");
  }
}
