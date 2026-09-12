import { ApiPropertyOptional } from '@nestjs/swagger'
import { PartialType } from '@nestjs/mapped-types'
import { IsIn, IsOptional } from 'class-validator'
import { CreateSolicitudeDto } from './create-solicitude.dto'

export const estados = ['Pendiente', 'En Proceso', 'Finalizada'] as const
export type estado = typeof estados[number]

export class UpdateSolicitudeDto extends PartialType(CreateSolicitudeDto) {
	@ApiPropertyOptional({ enum: estados })
	@IsOptional()
	@IsIn(estados as unknown as string[])
	estado?: estado
}
