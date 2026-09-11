import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Solicitude {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  titulo: string

  @Column()
  cliente: string

  @Column()
  categoria: string

  @Column()
  prioridad: string

  @Column( {default : 'Pendiente'} )
  estado: string

  @Column({ type: 'text' })
  descripcion: string

  @Column({ type: 'datetime'})
  fechaSolicitud: Date
}
