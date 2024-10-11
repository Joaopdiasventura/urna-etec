import {
    Inject,
    Injectable,
    NotFoundException,
    BadRequestException,
} from "@nestjs/common";
import { CreateClassDto } from "./dto/create-class.dto";
import { UpdateClassDto } from "./dto/update-class.dto";
import { Class } from "./entities/class.entity";
import { ClassRepository } from "./repositories/class.repository";

@Injectable()
export class ClassService {
    constructor(
        @Inject("ClassRepository")
        private readonly classRepository: ClassRepository,
    ) {}

    async create(createClassDto: CreateClassDto): Promise<void> {
        await this.classRepository.create(createClassDto);
    }

    async findAll(): Promise<Class[]> {
        return this.classRepository.findAll();
    }

    async findById(id: string): Promise<Class> {
        try {
            const class_ = await this.classRepository.findById(id);
            if (!class_) throw new NotFoundException("Sala não encontrada");
            return class_;
        } catch (error) {
            throw new BadRequestException("Id inválido");
        }
    }

    async update(id: string, updateClassDto: UpdateClassDto): Promise<void> {
        await this.findById(id);
        await this.classRepository.update(id, updateClassDto);
    }

    async remove(id: string): Promise<void> {
        await this.findById(id);
        await this.classRepository.delete(id);
    }
}
