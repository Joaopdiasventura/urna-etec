import { Injectable } from "@nestjs/common";
import { CreateClassDto } from "./dto/create-class.dto";
import { UpdateClassDto } from "./dto/update-class.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Class } from "./entities/class.entity";
import { Model } from "mongoose";

@Injectable()
export class ClassService {
  constructor(
    @InjectModel(Class.name) private readonly classModel: Model<Class>,
  ) {}

  async create(createClassDto: CreateClassDto): Promise<void> {
    await this.classModel.create(createClassDto);
  }

  async findAll(): Promise<Class[]> {
    return this.classModel.find().exec();
  }

  async findById(id: string): Promise<Class> {
    return this.classModel.findById(id).exec();
  }

  async update(id: string, updateClassDto: UpdateClassDto): Promise<void> {
    await this.classModel.findByIdAndUpdate(id, updateClassDto);
  }

  async remove(id: string): Promise<void> {
    await this.classModel.findByIdAndDelete(id);
  }
}
