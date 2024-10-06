import { ConfigService } from "@nestjs/config";
import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "./entities/user.entity";
import { Model } from "mongoose";
import { hash, genSalt, compare } from "bcrypt";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly configService: ConfigService,
  ) {}

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

  async update(id: string, updateUserDto: UpdateUserDto): Promise<void> {
    await this.userModel.findByIdAndUpdate(id, updateUserDto);
  }

  async remove(id: string): Promise<void> {
    await this.userModel.findByIdAndDelete(id);
  }

  async hashPassword(password: string): Promise<string> {
    return await hash(
      password,
      await genSalt(parseInt(this.configService.get<string>("salt"))),
    );
  }

  async comparePasswords(
    password: string,
    password_: string,
  ): Promise<boolean> {
    return await compare(password, password_);
  }
}
