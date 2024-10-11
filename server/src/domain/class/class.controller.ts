import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
} from "@nestjs/common";
import { ClassService } from "./class.service";
import { CreateClassDto } from "./dto/create-class.dto";
import { UpdateClassDto } from "./dto/update-class.dto";
import { AuthGuard } from "../../auth/guards/auth.guard";

@Controller("class")
export class ClassController {
    constructor(private readonly classService: ClassService) {}

    @UseGuards(AuthGuard)
    @Post()
    async create(@Body() createClassDto: CreateClassDto) {
        await this.classService.create(createClassDto);
        return { message: "Turma adicionada com sucessos" };
    }

    @UseGuards(AuthGuard)
    @Get()
    findAll() {
        return this.classService.findAll();
    }

    @UseGuards(AuthGuard)
    @Patch(":id")
    async update(
        @Param("id") id: string,
        @Body() updateClassDto: UpdateClassDto,
    ) {
        await this.classService.update(id, updateClassDto);
        return { message: "Turma atualizada com sucessos" };
    }

    @UseGuards(AuthGuard)
    @Delete(":id")
    async remove(@Param("id") id: string) {
        await this.classService.remove(id);
        return { message: "Turma deletada com sucessos" };
    }
}
