import { isDev } from "@/src/shared/utils/is-dev.utils";
import { ConfigService } from "@nestjs/config";
import { join } from "path";

export function getGraphQLconfig(configService:ConfigService){
    return{
        playground:isDev(configService),
        path:configService.getOrThrow<string>("GRAPHQL_PREFIX"),
        autoSchemaFile:join(process.cwd(),'src/core/graphql/schema.gql'),
        sortSchema:true,
        context:({req,res})=>({req,res})
    }
}