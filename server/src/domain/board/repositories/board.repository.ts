import { Board } from "../entities/board.entity";
import { CreateBoardDto } from "./../dto/create-board.dto";
import { UpdateBoardDto } from "./../dto/update-board.dto";
export interface BoardRepository {
    create(createBoardDto: CreateBoardDto): Promise<Board>;
    findAll(): Promise<Board[]>;
    findById(id: string): Promise<Board>;
    update(id: string, updateBoardDto: UpdateBoardDto): Promise<Board>;
    delete(id: string): Promise<Board>;
}
