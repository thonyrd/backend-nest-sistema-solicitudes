import { ApiProperty } from '@nestjs/swagger'
import { IsIn, IsNotEmpty, IsString, MinLength } from 'class-validator'

export const categoria = ['Hardware','Software','Redes','Seguridad','Soporte Usuario'] as const
export type categoria = typeof categoria[number]

export const prioridad = ['Baja','Media','Alta'] as const
export type prioridad = typeof prioridad[number]

export class CreateSolicitudeDto {
  @ApiProperty()
  @IsString() @MinLength(5)
  titulo: string

  @ApiProperty()
  @IsString() @IsNotEmpty()
  Cliente: string

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
  @IsString() @IsNotEmpty()
  fecha: string
}

