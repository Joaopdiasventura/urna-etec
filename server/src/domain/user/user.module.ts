import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from "./entities/user.entity";
import { ConfigModule } from "@nestjs/config";
import { MongoUserRepository } from "./repositories/user.mongo.repository";
import { AuthModule } from "src/auth/auth.module";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: "User", schema: UserSchema }]),
        ConfigModule,
        AuthModule,
    ],
    controllers: [UserController],
    exports: [UserService],
    providers: [
        UserService,
        {
            provide: "UserRepository",
            useClass: MongoUserRepository,
        },
    ],
})
export class UserModule {}
