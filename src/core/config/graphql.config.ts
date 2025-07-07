import type { ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigService } from '@nestjs/config';
import { isDev } from '@/src/shared/utils/is-dev.utils';
import { join } from 'path';

export function getGraphQLConfig(
  configService: ConfigService,
): ApolloDriverConfig {
  console.log(configService);
  
  return {
    debug: isDev(configService),
    playground: isDev(configService),
    path: configService.getOrThrow<string>('GRAPHQL_PREFIX'),
    autoSchemaFile: join(process.cwd(), 'src/core/graphql/schema.gql'),
    sortSchema: true,
    context: ({ req, res }) => ({ req, res }),
    installSubscriptionHandlers: true,
    introspection: true,
  };
}