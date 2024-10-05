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
import { ClassService } from "./class.service";
import { CreateClassDto } from "./dto/create-class.dto";
import { UpdateClassDto } from "./dto/update-class.dto";

@Controller("class")
export class ClassController {
  constructor(private readonly classService: ClassService) {}

  @Post()
  async create(@Body() createClassDto: CreateClassDto) {
    await this.classService.create(createClassDto);
    return { message: "Turma adicionada com sucessos" };
  }

  @Get()
  findAll() {
    return this.classService.findAll();
  }

  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body() updateClassDto: UpdateClassDto,
  ) {
    await this.existClass(id);
    await this.classService.update(id, updateClassDto);
    return { message: "Turma atualizada com sucessos" };
  }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    await this.existClass(id);
    await this.classService.remove(id);
    return { message: "Turma deletada com sucessos" };
  }

  async existClass(id: string) {
    const _class = await this.classService.findById(id);
    if (!_class) throw new NotFoundException("Turma não encontrada");
    return _class;
  }
}
