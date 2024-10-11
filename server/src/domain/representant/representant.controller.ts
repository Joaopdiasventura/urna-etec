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
import { RepresentantService } from "./representant.service";
import { CreateRepresentantDto } from "./dto/create-representant.dto";
import { UpdateRepresentantDto } from "./dto/update-representant.dto";
import { AuthGuard } from "../../auth/guards/auth.guard";

@Controller("representant")
export class RepresentantController {
    constructor(private readonly representantService: RepresentantService) {}

    @UseGuards(AuthGuard)
    @Post()
    async create(@Body() createRepresentantDto: CreateRepresentantDto) {
        await this.representantService.create(createRepresentantDto);
        return { message: "Representante adicionado com sucesso" };
    }

    @UseGuards(AuthGuard)
    @Get()
    async findAll() {
        return await this.representantService.findAll();
    }

    @UseGuards(AuthGuard)
    @Patch(":id")
    async update(
        @Param("id") id: string,
        @Body() updateRepresentantDto: UpdateRepresentantDto,
    ) {
        await this.representantService.update(id, updateRepresentantDto);
        return { message: "Representante atualizado com sucesso" };
    }

    @UseGuards(AuthGuard)
    @Delete(":id")
    async remove(@Param("id") id: string) {
        await this.representantService.remove(id);
        return { message: "Representante deletado com sucesso" };
    }
}
