import { Injectable } from "@nestjs/common";
import { CreateRepresentantDto } from "./dto/create-representant.dto";
import { UpdateRepresentantDto } from "./dto/update-representant.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Representant } from "./entities/representant.entity";
import { Model } from "mongoose";

@Injectable()
export class RepresentantService {
  constructor(
    @InjectModel(Representant.name)
    private readonly representantModel: Model<Representant>,
  ) {}

  async create(createRepresentantDto: CreateRepresentantDto): Promise<void> {
    await this.representantModel.create(createRepresentantDto);
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
  ): Promise<void> {
    await this.representantModel.findByIdAndUpdate(id, updateRepresentantDto);
  }

  async remove(id: string): Promise<void> {
    await this.representantModel.findByIdAndDelete(id);
  }
}
