import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/models/User';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgresql-ha-1694074892-pgpool.global-war.svc.cluster.local',
      // port: 5432,
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
