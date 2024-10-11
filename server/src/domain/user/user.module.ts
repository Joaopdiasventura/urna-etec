import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from "./entities/user.entity";
import { ConfigModule } from "@nestjs/config";
import { MongoUserRepository } from "./repositories/user.mongo.repository";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: "User", schema: UserSchema }]),
        ConfigModule,
    ],
    controllers: [UserController],
    providers: [
        UserService,
        {
            provide: "UserRepository",
            useClass: MongoUserRepository,
        },
    ],
})
export class UserModule {}
