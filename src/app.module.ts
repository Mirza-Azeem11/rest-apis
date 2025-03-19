import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { BookModule } from "./book/book.module";
import { SharedModule } from './shared/shared.module';
import { ConfigModule } from '@nestjs/config';
import { config } from 'dotenv';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import typeorm from './config/databaseConfig';


config();

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', `.env.${process.env.NODE_ENV}`],
      load: [typeorm],
    }),
      BookModule,SharedModule, AuthModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
