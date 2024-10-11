import { UpdateClassDto } from "./../dto/update-class.dto";
import { Class } from "../entities/class.entity";
import { CreateClassDto } from "./../dto/create-class.dto";
export interface ClassRepository {
    create(createClassDto: CreateClassDto): Promise<Class>;
    findAll(): Promise<Class[]>;
    findById(id: string): Promise<Class>;
    update(id: string, updateClassDto: UpdateClassDto): Promise<Class>;
    delete(id: string): Promise<Class>;
}
