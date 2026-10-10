import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
@Global()
@Module({ imports: [TypeOrmModule.forRoot({ type: 'postgres', url: process.env.DATABASE_URL, autoLoadEntities: false, entities: [], synchronize: false, logging: process.env.DB_LOGGING === 'true', retryAttempts: 5, retryDelay: 2000 })] })
export class DatabaseModule {}
