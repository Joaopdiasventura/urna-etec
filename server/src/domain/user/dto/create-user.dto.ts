import { IsString } from "class-validator";

export class CreateUserDto {
    @IsString({ message: "O nome precisa ser um texto" })
    name: string;
    @IsString({ message: "A senha precisa ser um texto" })
    password: string;
}
