import { IsString } from "class-validator";

export class CreateBoardDto {
  @IsString({ message: "O campo de nome deve ser um texto" })
  name: string;
  @IsString({ message: "O campo de presidente deve ser um texto" })
  president: string;
}
