import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostgresModule } from './postgres/postgres.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { TaskServieModule } from './task-servie/task-servie.module';
import { User } from './models/User';

@Module({
  imports: [PostgresModule, TypeOrmModule.forFeature([User]), ScheduleModule.forRoot(), TaskServieModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) { }
}
