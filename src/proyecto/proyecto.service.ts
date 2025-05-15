import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProyectoEntity } from './proyecto.entity';
@Injectable()
export class ProyectoService {
  constructor(
    @InjectRepository(ProyectoEntity)
    private readonly proyectoRepository: Repository<ProyectoEntity>,
  ) {}

  async crearProyecto(proyecto: ProyectoEntity): Promise<ProyectoEntity> {
    if (proyecto.presupuesto > 0 || proyecto.titulo.length >= 15) {
      return await this.proyectoRepository.save(proyecto);
    }
  }

  async avanzarProyecto(id: number): Promise<ProyectoEntity> {
    const proyecto = await this.proyectoRepository.findOne({ where: { id } });

    if (proyecto.estado >= 0 && proyecto.estado < 4) {
      proyecto.estado += 1;
      return await this.proyectoRepository.save(proyecto);
    }
  }

  async findAllEstudiantes(id: number): Promise<any[]> {
    const proyecto = await this.proyectoRepository.findOne({
      where: { id },
      relations: ['estudiantes'],
    });
    return proyecto.estudiantes;
  }
}
