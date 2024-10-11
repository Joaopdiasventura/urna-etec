import { IsString } from "class-validator";

export class LoginUserDto {
    @IsString({ message: "O nome precisa ser um texto" })
    name: string;
    @IsString({ message: "O senha precisa ser um texto" })
    password: string;
}
