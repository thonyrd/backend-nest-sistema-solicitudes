import 'dotenv/config'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Solicitude } from './solicitudes/entities/solicitude.entity'
import { SolicitudesModule } from './solicitudes/solicitudes.module'

@Module({
  imports: [
    // MySQL (recomendado en el curso)
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT ?? 3306),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [Solicitude],
      synchronize: true // SOLO en desarrollo (no en producción)
    }),

    // Alternativa SQLite (si no tienes MySQL):
    // TypeOrmModule.forRoot({
    //   type: 'sqlite',
    //   database: 'data.db',
    //   entities: [Solicitude],
    //   synchronize: true
    // }),

    SolicitudesModule
  ],
})
export class AppModule {}
