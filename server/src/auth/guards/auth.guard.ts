import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from "@nestjs/common";
import { AuthService } from "./../auth.service";
import { UserService } from "../../domain/user/user.service";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService,
    ) {}

    async canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        const token = request.headers.authorization;
        if (!token) throw new UnauthorizedException("Token não enviado");
        const id = await this.authService.decodeToken(token);
        const user = await this.userService.findById(id);
        if (!user) throw new UnauthorizedException("Usuário não encontrado");
        request.user = user;
        return true;
    }
}
