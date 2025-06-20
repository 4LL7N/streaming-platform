import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { RedisModule } from './redis/redis.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { getGraphQLconfig } from './config/graphql.config';
import { IS_DEV_ENV } from '../shared/utils/is-dev.utils';

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: !IS_DEV_ENV,
      isGlobal: true,
    }),
    GraphQLModule.forRoot({
      driver:ApolloDriver,
      imports:[ConfigModule],
      useFactory:getGraphQLconfig,
      Inject:[ConfigService]
    }),
    PrismaModule,
    RedisModule,
  ],
})
export class CoreModule {}
