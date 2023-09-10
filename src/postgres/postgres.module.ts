import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/models/User';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '194.67.91.42',
      port: 10001,
      username: 'gw',
      password: 'gw',
      database: 'gw',
      entities: [User],
      synchronize: true,
      autoLoadEntities: true,
    }),
  ],
})
export class PostgresModule { }
