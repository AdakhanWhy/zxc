import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from '../../config';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        dialect: 'postgres',
        host: configService.get('db_host'),
        port: configService.get('db_port'),
        username: configService.get('db_user'),
        password: configService.get('db_pass'),
        database: configService.get('db_name'),
        synchronize: true,
        autoLoadModels: true,
        models: [],
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}