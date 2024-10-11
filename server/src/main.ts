import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { TimeoutInterceptor } from "./shared/interceptors/timeout.interceptor";
import { ConfigService } from "@nestjs/config";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);
    app.useGlobalPipes(
        new ValidationPipe({ transform: true, whitelist: true }),
    );
    app.enableCors({
        origin: configService.get("frontend"),
        methods: ["GET", "DELETE", "POST", "PATCH"],
        allowedHeaders: ["Content-Type", "Authorization"],
    });
    app.useGlobalInterceptors(new TimeoutInterceptor());
    await app.listen(parseInt(configService.get("port")));
}
bootstrap();
