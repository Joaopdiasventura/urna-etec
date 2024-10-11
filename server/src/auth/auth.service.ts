import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(private readonly jwt: JwtService) {}

    public async generateToken(id: string) {
        return await this.jwt.signAsync(id);
    }

    public async decodeToken(token: string) {
        try {
            return String(await this.jwt.verifyAsync(token));
        } catch (error) {
            throw new UnauthorizedException("Token inválido");
        }
    }
}
