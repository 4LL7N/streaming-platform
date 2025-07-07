import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { RedisModule } from './redis/redis.module';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule, Query, Resolver } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
// import { getGraphQLConfig } from './config/graphql.config';
import { IS_DEV_ENV } from '../shared/utils/is-dev.utils';
import { AccountModule } from '../modules/auth/account/account.module';
import { join } from 'path';



@Resolver()
export class TempResolver {
  @Query(() => String)
  healthCheck() {
    return 'OK';
  }
}

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: !IS_DEV_ENV,
      isGlobal: true,
      envFilePath:'.env'
    }),
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      playground: process.env.NODE_ENV === 'development',
      autoSchemaFile: join(process.cwd(), 'src/core/graphql/schema.gql'),
      path: process.env.GRAPHQL_PREFIX || '/graphql', 
      sortSchema: true,
      context: ({ req, res }) => ({ req, res }),
      installSubscriptionHandlers: true,
      introspection: true,
    }),
    PrismaModule,
    RedisModule,
    AccountModule
  ],
})
export class CoreModule {}

// GraphQLModule.forRoot({
//       driver:ApolloDriver,
//       imports:[ConfigModule],
//       useFactory:getGraphQLConfig,
//       inject:[ConfigService]
//     }),
