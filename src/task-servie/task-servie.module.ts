import { Module } from '@nestjs/common';
import { TaskServieService } from './task-servie.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [TaskServieService],
  imports: [TypeOrmModule.forFeature([])]
})
export class TaskServieModule { }
