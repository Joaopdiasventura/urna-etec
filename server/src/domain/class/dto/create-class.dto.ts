import { IsNotEmpty, IsString } from "class-validator";

export class CreateClassDto {
    @IsString({ message: "O curso precisa ser um texto" })
    course: string;
    @IsString({ message: "O ano precisa ser um texto" })
    year: string;
    @IsString({ message: "O preríodo precisa ser um texto" })
    period: string;
}
