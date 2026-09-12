import { ApiProperty } from '@nestjs/swagger'
import { IsDateString, IsIn, IsNotEmpty, IsString, MinLength } from 'class-validator'

export const categoria = ['Hardware','Software','Redes','Seguridad','Soporte Usuario'] as const
export type categoria = typeof categoria[number]

export const prioridad = ['Baja','Media','Alta','Crítica'] as const
export type prioridad = typeof prioridad[number]

export class CreateSolicitudeDto {
  @ApiProperty()
  @IsString() @MinLength(5)
  titulo: string

  @ApiProperty()
  @IsString() @IsNotEmpty()
  cliente: string

  @ApiProperty({ enum: categoria })
  @IsIn(categoria as unknown as string[])
  categoria: categoria

  @ApiProperty({ enum: prioridad })
  @IsIn(prioridad as unknown as string[])
  prioridad: prioridad

  @ApiProperty()
  @IsString() @MinLength(15)
  descripcion: string

  @ApiProperty()
  @IsDateString({ strict: true })
  fechaSolicitud: string
}

