import { UpdateRepresentantDto } from "../dto/update-representant.dto";
import { Representant } from "../entities/representant.entity";
import { CreateRepresentantDto } from "../dto/create-representant.dto";
export interface RepresentantRepository {
    create(createRepresentantDto: CreateRepresentantDto): Promise<Representant>;
    findAll(): Promise<Representant[]>;
    findById(id: string): Promise<Representant>;
    update(
        id: string,
        updateRepresentantDto: UpdateRepresentantDto,
    ): Promise<Representant>;
    delete(id: string): Promise<Representant>;
}
