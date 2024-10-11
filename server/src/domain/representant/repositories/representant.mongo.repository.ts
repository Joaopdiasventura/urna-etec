import { InjectModel } from "@nestjs/mongoose";
import { CreateRepresentantDto } from "../dto/create-representant.dto";
import { UpdateRepresentantDto } from "../dto/update-representant.dto";
import { Representant } from "../entities/representant.entity";
import { RepresentantRepository } from "./representant.repository";
import { Model } from "mongoose";

export class MongoRepresentantRepository implements RepresentantRepository {
    constructor(
        @InjectModel("Representant")
        private readonly representantModel: Model<Representant>,
    ) {}

    async create(
        createRepresentantDto: CreateRepresentantDto,
    ): Promise<Representant> {
        return await this.representantModel.create(createRepresentantDto);
    }

    async findAll(): Promise<Representant[]> {
        return await this.representantModel
            .find()
            .populate("class")
            .sort("class.course class.year name")
            .exec();
    }

    async findById(id: string): Promise<Representant> {
        return await this.representantModel.findById(id).exec();
    }

    async update(
        id: string,
        updateRepresentantDto: UpdateRepresentantDto,
    ): Promise<Representant> {
        return await this.representantModel
            .findByIdAndUpdate(id, updateRepresentantDto)
            .exec();
    }

    async delete(id: string): Promise<Representant> {
        return await this.representantModel.findByIdAndDelete(id).exec();
    }
}
