import { NestFactory } from '@nestjs/core';
import { CoreModule } from './core/core.module';
import { ConfigService } from '@nestjs/config';
import { RedisService } from './core/redis/redis.service';
import { Logger, ValidationPipe } from '@nestjs/common';
import * as session from "express-session"
import * as cookieParser from "cookie-parser"
import { RedisStore } from 'connect-redis';

async function bootstrap() {
  const app = await NestFactory.create(CoreModule,{
    logger: ['verbose', 'debug', 'log', 'warn', 'error'],
  });
  const config = app.get(ConfigService)
  const redis = app.get(RedisService)
  app.use(cookieParser(config.getOrThrow<string>("COOKIE_SECRET")))
  app.use(session({
    secret:config.getOrThrow<string>("SESSION_SECRET"),
    name:config.getOrThrow<string>("SESSION_NAME"),
    saveUninitialized:false,
    resave:false,
    cookie:{
      domain:config.getOrThrow<string>("COOKIE_DOMAIN"),
      maxAge:1000*60*60*24*30,
      httpOnly:config.getOrThrow<string>("COOKIE_HTTP_ONLY") === 'true',
      secure:config.getOrThrow<boolean>("COOKIE_SECURE"),
      sameSite:'lax'
    },
    store:new RedisStore({
      client:redis,
      prefix:config.getOrThrow<string>("SESSION_PREFIX")
    })
  }))
  app.useGlobalPipes(
    new ValidationPipe({
      transform:true
    })
  )
  app.enableCors({
    origin:config.getOrThrow<string>("ALLOWED_ORIGIN"),
    credentials:true,
    exposedHeaders:["Set-Cookie"]
  })
  await app.listen(process.env.PORT ?? 3000);
  Logger.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
