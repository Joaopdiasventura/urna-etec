import {
    Inject,
    Injectable,
    NotFoundException,
    BadRequestException,
} from "@nestjs/common";
import { CreateBoardDto } from "./dto/create-board.dto";
import { UpdateBoardDto } from "./dto/update-board.dto";
import { Board } from "./entities/board.entity";
import { BoardRepository } from "./repositories/board.repository";

@Injectable()
export class BoardService {
    constructor(
        @Inject("BoardRepository")
        private readonly boardRepository: BoardRepository,
    ) {}

    async create(createBoardDto: CreateBoardDto): Promise<void> {
        await this.boardRepository.create(createBoardDto);
    }

    async findAll(): Promise<Board[]> {
        return await this.boardRepository.findAll();
    }

    async findById(id: string): Promise<Board> {
        try {
            const board = await this.boardRepository.findById(id);
            if (!board) throw new NotFoundException("Chapa não encontrada");
            return board;
        } catch (error) {
            throw new BadRequestException("Id inválidos");
        }
    }

    async update(id: string, updateBoardDto: UpdateBoardDto): Promise<void> {
        await this.findById(id);
        await this.boardRepository.update(id, updateBoardDto);
    }

    async remove(id: string): Promise<void> {
        await this.findById(id);
        await this.boardRepository.delete(id);
    }
}
