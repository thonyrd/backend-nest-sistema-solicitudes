import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateSolicitudeDto } from './dto/create-solicitude.dto'
import { UpdateSolicitudeDto } from './dto/update-solicitude.dto'
import { categoria, prioridad } from './dto/create-solicitude.dto'
import { Solicitude } from './entities/solicitude.entity'

@Injectable()
export class SolicitudesService {
  constructor(
    @InjectRepository(Solicitude)
    private repo: Repository<Solicitude>,
  ) {}

  findAll() {
    return this.repo.find()
  }

  async findOne(id: number) {
    const found = await this.repo.findOne({ where: { id } })
    if (!found) throw new NotFoundException({ error: 'solicitude no encontrado' })
    return found
  }

  create(dto: CreateSolicitudeDto) {
    this.ensureDateIsNotInFuture(dto.fechaSolicitud)
    const ent = this.repo.create({
      ...dto,
      estado: 'Pendiente',
      fechaSolicitud: new Date(dto.fechaSolicitud),
    })
    return this.repo.save(ent)
  }

  async update(id: number, dto: UpdateSolicitudeDto) {
    const prev = await this.findOne(id)
    if (dto.fechaSolicitud) this.ensureDateIsNotInFuture(dto.fechaSolicitud)
    if (dto.estado && prev.estado === 'Finalizada' && dto.estado === 'Pendiente') {
      throw new BadRequestException('Una solicitud Finalizada no puede volver a Pendiente')
    }
    Object.assign(prev, {
      ...dto,
      ...(dto.fechaSolicitud ? { fechaSolicitud: new Date(dto.fechaSolicitud) } : {}),
    })
    return this.repo.save(prev)
  }

  async remove(id: number) {
    const prev = await this.findOne(id)
    if (prev.estado !== 'Finalizada') {
      throw new BadRequestException('Solo se pueden eliminar solicitudes Finalizadas')
    }
    await this.repo.remove(prev)
    return { ok: true }
  }

  async buscar(categoria?: string, prioridad?: string) {
    if (categoria && !this.isCategoria(categoria)) {
      throw new BadRequestException('Categoría inválida')
    }
    if (prioridad && !this.isPrioridad(prioridad)) {
      throw new BadRequestException('Prioridad inválida')
    }
    const qb = this.repo.createQueryBuilder('e')
    if (categoria) qb.andWhere('e.categoria = :categoria', { categoria })
    if (prioridad) qb.andWhere('e.prioridad = :prioridad', { prioridad })
    return qb.getMany()
  }

  private ensureDateIsNotInFuture(value: string) {
    const date = new Date(value)
    if (date.getTime() > Date.now()) {
      throw new BadRequestException('La fecha de solicitud no puede ser posterior a la fecha actual')
    }
  }

  private isCategoria(value: string): value is categoria {
    return (categoria as readonly string[]).includes(value)
  }

  private isPrioridad(value: string): value is prioridad {
    return (prioridad as readonly string[]).includes(value)
  }
}
