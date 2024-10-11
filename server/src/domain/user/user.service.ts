import {
    BadRequestException,
    Inject,
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { UserRepository } from "./repositories/user.repository";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { LoginUserDto } from "./dto/login-user.dto";
import { hash, genSalt, compare } from "bcrypt";
import { User } from "./entities/user.entity";

@Injectable()
export class UserService {
    constructor(
        @Inject("UserRepository")
        private readonly userRepository: UserRepository,
        private readonly configService: ConfigService,
    ) {}

    async create(createUserDto: CreateUserDto): Promise<User> {
        await this.existWithName(createUserDto.name);

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
        const { name } = await this.findById(id);
        if (updateUserDto.name && name != updateUserDto.name)
            await this.existWithName(updateUserDto.name);

        updateUserDto.password =
            updateUserDto && (await this.hashPassword(updateUserDto.password));

        await this.userRepository.update(id, updateUserDto);
    }

    async remove(id: string): Promise<void> {
        await this.findById(id);
        await this.userRepository.delete(id);
    }

    async existWithName(name: string): Promise<void> {
        const user = await this.userRepository.findByName(name);
        if (user)
            throw new NotFoundException("Já existe um usuário com esse nome");
    }

    async hashPassword(password: string): Promise<string> {
        return await hash(
            password,
            await genSalt(parseInt(this.configService.get<string>("salt"))),
        );
    }
}
