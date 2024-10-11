import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
} from "@nestjs/common";
import { BoardService } from "./board.service";
import { CreateBoardDto } from "./dto/create-board.dto";
import { UpdateBoardDto } from "./dto/update-board.dto";
import { AuthGuard } from "src/auth/guards/auth.guard";

@Controller("board")
export class BoardController {
    constructor(private readonly boardService: BoardService) {}

    @UseGuards(AuthGuard)
    @Post()
    async create(@Body() createBoardDto: CreateBoardDto) {
        await this.boardService.create(createBoardDto);
        return { message: "Chapa adicionada com sucesso" };
    }

    @UseGuards(AuthGuard)
    @Get()
    async findAll() {
        return await this.boardService.findAll();
    }

    @UseGuards(AuthGuard)
    @Patch(":id")
    async update(
        @Param("id") id: string,
        @Body() updateBoardDto: UpdateBoardDto,
    ) {
        await this.boardService.update(id, updateBoardDto);
        return { message: "Chapa atualizada com sucesso" };
    }

    @UseGuards(AuthGuard)
    @Delete(":id")
    async remove(@Param("id") id: string) {
        await this.boardService.remove(id);
        return { message: "Chapa deletada com sucesso" };
    }
}
