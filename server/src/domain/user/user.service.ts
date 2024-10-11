import { UserRepository } from "./repositories/user.repository";
import { LoginUserDto } from "./dto/login-user.dto";
import { ConfigService } from "@nestjs/config";
import {
    BadRequestException,
    Inject,
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";
import { hash, genSalt, compare } from "bcrypt";

@Injectable()
export class UserService {
    constructor(
        @Inject("UserRepository")
        private readonly userRepository: UserRepository,
        private readonly configService: ConfigService,
    ) {}

    async create(createUserDto: CreateUserDto): Promise<User> {
        const existUser = await this.findByName(createUserDto.name);

        if (existUser)
            throw new BadRequestException("Já existe um usuário com esse nome");

        createUserDto.password = await this.hashPassword(
            createUserDto.password,
        );
        return await this.userRepository.create(createUserDto);
    }

    async validatePassword(loginUserDto: LoginUserDto) {
        const user = await this.findByName(loginUserDto.name);
        if (!(await compare(loginUserDto.password, user.password)))
            throw new UnauthorizedException("Senha incorreta");
        return user;
    }

    async findAll(): Promise<User[]> {
        return this.userRepository.findAll();
    }

    async findByName(name: string): Promise<User> {
        const user = await this.userRepository.findByName(name);
        if (!user) throw new NotFoundException("Usuário não encontrado");
        return user;
    }

    async findById(id: string): Promise<User> {
        try {
            const user = await this.userRepository.findById(id);
            if (!user) throw new NotFoundException("Usuário não encontrado");
            return user;
        } catch (error) {
            throw new BadRequestException("Id inválido");
        }
    }

    async update(id: string, updateUserDto: UpdateUserDto): Promise<void> {
        await this.findById(id);
        updateUserDto.password =
            updateUserDto && (await this.hashPassword(updateUserDto.password));
        await this.userRepository.update(id, updateUserDto);
    }

    async remove(id: string): Promise<void> {
        await this.findById(id);
        await this.userRepository.delete(id);
    }

    async hashPassword(password: string): Promise<string> {
        return await hash(
            password,
            await genSalt(parseInt(this.configService.get<string>("salt"))),
        );
    }
}
