import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { JwtModule } from "@nestjs/jwt";
import { AppConfig } from "./config/app.config";
import { DatabaseConfig } from "./config/db.config";
import { UserModule } from "./domain/user/user.module";
import { ClassModule } from "./domain/class/class.module";
import { RepresentantModule } from "./domain/representant/representant.module";
import { BoardModule } from "./domain/board/board.module";
import { VoteModule } from "./domain/vote/vote.module";
import { CommonModule } from './shared/common/common.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [AppConfig, DatabaseConfig],
            isGlobal: true,
        }),
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                uri: configService.get<string>("mongo.uri"),
            }),
        }),
        JwtModule.register({ global: true, secret: AppConfig().jwtSecret }),
        UserModule,
        ClassModule,
        RepresentantModule,
        BoardModule,
        VoteModule,
        CommonModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
