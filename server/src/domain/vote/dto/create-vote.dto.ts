import { IsMongoId } from "class-validator";

export class CreateVoteDto {
    @IsMongoId({ message: "O campo de representante precisa ser um ObjectId" })
    representant: string;
    @IsMongoId({ message: "O campo de chapa precisa ser um ObjectId" })
    board: string;
}
