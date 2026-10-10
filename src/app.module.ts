import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsModule } from './posts/posts.module';
import { BookmarksModule } from './bookmarks/bookmarks.module';
import { ModerationModule } from './moderation/moderation.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [
        ConfigModule,
        PostsModule,
        BookmarksModule,
        ModerationModule,
      ],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const url = config.get<string>('DATABASE_URL');

        if (!url) {
          throw new Error('DATABASE_URL is missing from .env');
        }

        return {
          type: 'postgres' as const,
          url,
          autoLoadEntities: true,
          synchronize: false,
        };
      },
    }),
  ],
})
export class AppModule { }