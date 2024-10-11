import { IsMongoId, IsNotEmpty, IsString } from "class-validator";

export class CreateRepresentantDto {
    @IsString({ message: "O nome precisa ser um texto" })
    name: string;
    @IsMongoId({ message: "O id da sala precis ser um ObjectId" })
    class: string;
}
