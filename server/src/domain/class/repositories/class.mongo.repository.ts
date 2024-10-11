import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateClassDto } from "../dto/create-class.dto";
import { UpdateClassDto } from "../dto/update-class.dto";
import { Class } from "../entities/class.entity";
import { ClassRepository } from "./class.repository";

export class MongoClassRepository implements ClassRepository {
    constructor(
        @InjectModel("Class") private readonly classModel: Model<Class>,
    ) {}

    async create(createClassDto: CreateClassDto): Promise<Class> {
        return await this.classModel.create(createClassDto);
    }

    async findAll(): Promise<Class[]> {
        return await this.classModel.find().exec();
    }

    async findById(id: string): Promise<Class> {
        return this.classModel.findById(id).exec();
    }

    async update(id: string, updateClassDto: UpdateClassDto): Promise<Class> {
        return await this.classModel.findByIdAndUpdate(id, updateClassDto);
    }

    async delete(id: string): Promise<Class> {
        return await this.classModel.findByIdAndDelete(id);
    }
}
