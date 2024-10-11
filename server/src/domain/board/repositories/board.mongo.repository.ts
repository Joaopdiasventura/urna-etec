import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateBoardDto } from "../dto/create-board.dto";
import { UpdateBoardDto } from "../dto/update-board.dto";
import { Board } from "../entities/board.entity";
import { BoardRepository } from "./board.repository";

export class MongoBoardRepository implements BoardRepository {
    constructor(
        @InjectModel(Board.name) private readonly boardModel: Model<Board>,
    ) {}

    async create(createBoardDto: CreateBoardDto): Promise<Board> {
        return await this.boardModel.create(createBoardDto);
    }

    async findAll(): Promise<Board[]> {
        return await this.boardModel.find().exec();
    }

    async findById(id: string): Promise<Board> {
        return await this.boardModel.findById(id).exec();
    }

    async update(id: string, updateBoardDto: UpdateBoardDto): Promise<Board> {
        return await this.boardModel.findByIdAndUpdate(id, updateBoardDto);
    }

    async delete(id: string): Promise<Board> {
        return await this.boardModel.findByIdAndDelete(id);
    }
}
