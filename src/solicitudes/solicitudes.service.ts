import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateSolicitudeDto } from './dto/create-solicitude.dto'
import { UpdateSolicitudeDto } from './dto/update-solicitude.dto'
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
    const ent = this.repo.create(dto)
    return this.repo.save(ent)
  }

  async update(id: number, dto: UpdateSolicitudeDto) {
    const prev = await this.findOne(id)
    Object.assign(prev, dto)
    return this.repo.save(prev)
  }

  async remove(id: number) {
    const prev = await this.findOne(id)
    await this.repo.remove(prev)
    return { ok: true }
  }

  async buscar(categoria?: string, prioridad?: string) {
    const qb = this.repo.createQueryBuilder('e')
    if (categoria) qb.andWhere('e.categoria = :categoria', { categoria })
    if (prioridad) qb.andWhere('e.prioridad = :prioridad', { prioridad })
    return qb.getMany()
  }
}
