import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";
import { User } from "../entities/user.entity";
import { UserRepository } from "./user.repository";

export class MongoUserRepository implements UserRepository {
    constructor(@InjectModel("User") private readonly userModel: Model<User>) {}

    async create(createUserDto: CreateUserDto): Promise<User> {
        return await this.userModel.create(createUserDto);
    }

    async findAll(): Promise<User[]> {
        return this.userModel.find().exec();
    }

    async findByName(name: string): Promise<User> {
        return this.userModel.findOne({ name }).exec();
    }

    async findById(id: string): Promise<User> {
        return this.userModel.findById(id).exec();
    }

    async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
        return await this.userModel.findByIdAndUpdate(id, updateUserDto).exec();
    }

    async delete(id: string): Promise<User> {
        return await this.userModel.findByIdAndDelete(id).exec();
    }
}
