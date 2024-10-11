import {
    Controller,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    HttpCode,
    UseGuards,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { AuthService } from "../../auth/auth.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { LoginUserDto } from "./dto/login-user.dto";
import { AuthGuard } from "../../auth/guards/auth.guard";

@Controller("user")
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService,
    ) {}

    @Post()
    async create(@Body() createUserDto: CreateUserDto) {
        const user = await this.userService.create(createUserDto);
        const token = await this.authService.generateToken(user.id);
        return { message: "Usuário criado com sucesso", user, token };
    }

    @HttpCode(200)
    @Post("/login")
    async login(@Body() loginUserDto: LoginUserDto) {
        const user = await this.userService.validatePassword(loginUserDto);
        const token = await this.authService.generateToken(user.id);
        return { message: "Login realizado com sucesso", user, token };
    }

    @UseGuards(AuthGuard)
    @Patch(":id")
    async update(
        @Param("id") id: string,
        @Body() updateUserDto: UpdateUserDto,
    ) {
        await this.userService.update(id, updateUserDto);
        return { message: "Usuário atulizado com sucesso" };
    }

    @UseGuards(AuthGuard)
    @Delete(":id")
    async remove(@Param("id") id: string) {
        await this.userService.remove(id);
        return { message: "Usuário deletado com sucesso" };
    }
}
