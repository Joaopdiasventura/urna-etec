import { Injectable } from "@nestjs/common";
import { CreateBoardDto } from "./dto/create-board.dto";
import { UpdateBoardDto } from "./dto/update-board.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Board } from "./entities/board.entity";
import { Model } from "mongoose";

@Injectable()
export class BoardService {
  constructor(
    @InjectModel(Board.name) private readonly boardModel: Model<Board>,
  ) {}

  async create(createBoardDto: CreateBoardDto): Promise<void> {
    await this.boardModel.create(createBoardDto);
  }

  async findAll(): Promise<Board[]> {
    return await this.boardModel.find().exec();
  }

  async findById(id: string): Promise<Board> {
    return await this.boardModel.findById(id).exec();
  }

  async update(id: string, updateBoardDto: UpdateBoardDto): Promise<void> {
    await this.boardModel.findByIdAndUpdate(id, updateBoardDto);
  }

  async remove(id: string): Promise<void> {
    await this.boardModel.findByIdAndDelete(id);
  }
}
