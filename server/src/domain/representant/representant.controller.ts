import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from "@nestjs/common";
import { RepresentantService } from "./representant.service";
import { CreateRepresentantDto } from "./dto/create-representant.dto";
import { UpdateRepresentantDto } from "./dto/update-representant.dto";

@Controller("representant")
export class RepresentantController {
    constructor(private readonly representantService: RepresentantService) {}

    @Post()
    async create(@Body() createRepresentantDto: CreateRepresentantDto) {
        await this.representantService.create(createRepresentantDto);
        return { message: "Representante adicionado com sucesso" };
    }

    @Get()
    async findAll() {
        return await this.representantService.findAll();
    }

    @Patch(":id")
    async update(
        @Param("id") id: string,
        @Body() updateRepresentantDto: UpdateRepresentantDto,
    ) {
        await this.representantService.update(id, updateRepresentantDto);
        return { message: "Representante atualizado com sucesso" };
    }

    @Delete(":id")
    async remove(@Param("id") id: string) {
        await this.representantService.remove(id);
        return { message: "Representante deletado com sucesso" };
    }
}
