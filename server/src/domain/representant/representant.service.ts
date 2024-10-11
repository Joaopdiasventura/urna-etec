import {
    Inject,
    Injectable,
    BadRequestException,
    NotFoundException,
} from "@nestjs/common";
import { CreateRepresentantDto } from "./dto/create-representant.dto";
import { UpdateRepresentantDto } from "./dto/update-representant.dto";
import { Representant } from "./entities/representant.entity";
import { ClassService } from "../class/class.service";
import { RepresentantRepository } from "./repositories/representant.repository";

@Injectable()
export class RepresentantService {
    constructor(
        @Inject("RepresentantRepository")
        private readonly representantRepository: RepresentantRepository,
        private readonly classService: ClassService,
    ) {}

    async create(createRepresentantDto: CreateRepresentantDto): Promise<void> {
        await this.existClass(createRepresentantDto.class);
        await this.representantRepository.create(createRepresentantDto);
    }

    async findAll(): Promise<Representant[]> {
        return await this.representantRepository.findAll();
    }

    async findById(id: string): Promise<Representant> {
        try {
            const representant = await this.representantRepository.findById(id);
            if (!representant)
                throw new NotFoundException("Representante não encontrado");
            return representant;
        } catch (error) {
            throw new BadRequestException("Id inválido");
        }
    }

    async update(
        id: string,
        updateRepresentantDto: UpdateRepresentantDto,
    ): Promise<void> {
        await this.findById(id);
        if (updateRepresentantDto.class)
            await this.existClass(updateRepresentantDto.class);
        await this.representantRepository.update(id, updateRepresentantDto);
    }

    async remove(id: string): Promise<void> {
        await this.findById(id);
        await this.representantRepository.delete(id);
    }

    async existClass(id: string) {
        await this.classService.findById(id);
    }
}
