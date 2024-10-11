import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    HttpCode,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { LoginUserDto } from "./dto/login-user.dto";

@Controller("user")
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    async create(@Body() createUserDto: CreateUserDto) {
        const user = await this.userService.create(createUserDto);

        return { message: "Usuário criado com sucesso", user };
    }

    @HttpCode(200)
    @Post("/login")
    async login(@Body() loginUserDto: LoginUserDto) {
        return {
            user: await this.userService.validatePassword(loginUserDto),
        };
    }

    @Get()
    findAll() {
        return this.userService.findAll();
    }

    @Get(":name")
    async findOne(@Param("name") name: string) {
        return await this.userService.findByName(name);
    }

    @Patch(":id")
    async update(
        @Param("id") id: string,
        @Body() updateUserDto: UpdateUserDto,
    ) {
        await this.userService.update(id, updateUserDto);
        return { message: "Usuário atulizado com sucesso" };
    }

    @Delete(":id")
    async remove(@Param("id") id: string) {
        await this.userService.remove(id);
        return { message: "Usuário deletado com sucesso" };
    }
}
