import { NestFactory } from '@nestjs/core'
import { AppModule } from './src/app.module'
import { DataSource } from 'typeorm'
import { Solicitude } from './src/solicitudes/entities/solicitude.entity'

async function bootstrap() {
	const app = await NestFactory.createApplicationContext(AppModule)
	const ds = app.get(DataSource)
	const repo = ds.getRepository(Solicitude)

	const base = [
		{
			titulo: 'Computador no enciende',
			cliente: 'Empresa Norte',
			categoria: 'Hardware',
			prioridad: 'Alta',
			estado: 'Pendiente',
			descripcion: 'El computador del area administrativa no enciende.',
			fechaSolicitud: new Date('2026-09-01T09:00:00'),
		},
		{
			titulo: 'Instalacion de software',
			cliente: 'Consultora Valle',
			categoria: 'Software',
			prioridad: 'Media',
			estado: 'Pendiente',
			descripcion: 'Se necesita instalar el paquete de oficina actualizado.',
			fechaSolicitud: new Date('2026-09-02T10:30:00'),
		},
		{
			titulo: 'Problemas de conexion',
			cliente: 'Comercial Centro',
			categoria: 'Redes',
			prioridad: 'Baja',
			estado: 'Pendiente',
			descripcion: 'La conexion de red se interrumpe durante la jornada.',
			fechaSolicitud: new Date('2026-09-03T14:15:00'),
		},
	]

	await repo.save(base)
	console.log('Datos de ejemplo insertados')
	await app.close()
}

bootstrap()
