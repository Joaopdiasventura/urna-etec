import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { TimeoutInterceptor } from "./shared/interceptors/timeout.interceptor";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  app.useGlobalInterceptors(new TimeoutInterceptor());
  await app.listen(3000);
}
bootstrap();
