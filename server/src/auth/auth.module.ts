import { forwardRef, Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UserModule } from "src/domain/user/user.module";

@Module({
    imports: [forwardRef(() => UserModule)],
    exports: [AuthService],
    providers: [AuthService],
})
export class AuthModule {}
