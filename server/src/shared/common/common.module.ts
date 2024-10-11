import { Module } from "@nestjs/common";
import { AuthModule } from "src/auth/auth.module";
import { UserModule } from "src/domain/user/user.module";

@Module({
    imports: [UserModule, AuthModule],
    exports: [UserModule, AuthModule],
})
export class CommonModule {}
