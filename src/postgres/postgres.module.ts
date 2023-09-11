import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/models/User';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '5.63.159.205',
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
