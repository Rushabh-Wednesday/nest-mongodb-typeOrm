import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './core/config/database.module';
import { PartiesModule } from './app/parties/parties.module';
import DatabaseConfig from './core/config/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.ENVIRONMENT}`,
      isGlobal: true,
      load: [
        () => ({
          database: DatabaseConfig(),
        }),
      ],
    }),
    DatabaseModule,
    PartiesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
