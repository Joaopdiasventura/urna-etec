import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  NotFoundException,
  HttpCode,
  UnauthorizedException,
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
    const existUser = await this.userService.findByName(createUserDto.name);

    if (existUser)
      throw new BadRequestException("Já existe um usuário com esse nome");

    createUserDto.password = await this.userService.hashPassword(
      createUserDto.password,
    );

    const user = await this.userService.create(createUserDto);

    return { message: "Usuário criado com sucesso", user };
  }

  @HttpCode(200)
  @Post("/login")
  async login(@Body() loginUserDto: LoginUserDto) {
    const user = await this.userService.findByName(loginUserDto.name);
    if (!user) throw new NotFoundException("Email não cadastrado");
    if (
      !(await this.userService.comparePasswords(
        loginUserDto.password,
        user.password,
      ))
    )
      throw new UnauthorizedException("Senha incorreta");
    return {
      user,
    };
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(":name")
  async findOne(@Param("name") name: string) {
    const user = await this.userService.findByName(name);
    if (!user) throw new NotFoundException("Usuário não encontrado");
    return user;
  }

  @Patch(":id")
  async update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    if (updateUserDto.password)
      updateUserDto.password = await this.userService.hashPassword(
        updateUserDto.password,
      );

    await this.userService.update(id, updateUserDto);
    return { message: "Usuário atulizado com sucesso" };
  }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    await this.existUser(id);
    await this.userService.remove(id);
    return { message: "Usuário deletado com sucesso" };
  }

  async existUser(id: string) {
    const user = await this.userService.findById(id);
    if (!user) throw new NotFoundException("Usuário não encontrado");
  }
}
