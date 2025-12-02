import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    // Torna o .env disponível na aplicação toda
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // Configuração do Sequelize com PostgreSQL
    SequelizeModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        dialect: 'postgres',
        host: config.get<string>('DB_HOST'),
        port: parseInt(config.get<string>('DB_PORT') ?? '5432'),
        username: config.get<string>('DB_USERNAME'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_NAME'),
        autoLoadModels: true,   // depois, quando criarmos os models, ele carrega
        synchronize: true,      // cria/atualiza tabelas automaticamente (somente dev)
        logging: false,         // se quiser ver as queries, pode mudar pra true
      }),
    }),

    TasksModule,
  ],
})
export class AppModule {}
