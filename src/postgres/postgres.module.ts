import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/models/User';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
            host: '109.172.89.4',
            port: 12121,
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
