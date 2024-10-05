import { ClassService } from "./../class/class.service";
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
} from "@nestjs/common";
import { RepresentantService } from "./representant.service";
import { CreateRepresentantDto } from "./dto/create-representant.dto";
import { UpdateRepresentantDto } from "./dto/update-representant.dto";

@Controller("representant")
export class RepresentantController {
  constructor(
    private readonly representantService: RepresentantService,
    private readonly classService: ClassService,
  ) {}

  @Post()
  async create(@Body() createRepresentantDto: CreateRepresentantDto) {
    await this.existClass(createRepresentantDto.class);
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
    if (updateRepresentantDto.class)
      await this.existClass(updateRepresentantDto.class);
    await this.representantService.update(id, updateRepresentantDto);
    return { message: "Representante atualizado com sucesso" };
  }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    await this.representantService.remove(id);
    return { message: "Representante deletado com sucesso" };
  }

  async existRepresentant(id: string) {
    const representant = await this.representantService.findById(id);
    if (!representant) throw new NotFoundException("Sala não encontrada");
    return representant;
  }

  async existClass(id: string) {
    const _class = await this.classService.findById(id);
    if (!_class) throw new NotFoundException("Sala não encontrada");
  }
}
