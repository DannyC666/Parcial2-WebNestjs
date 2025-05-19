import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProyectoEntity } from './proyecto.entity';
import {
  BusinessError,
  BusinessLogicException,
} from 'src/shared/errors/business-errors';

@Injectable()
export class ProyectoService {
  constructor(
    @InjectRepository(ProyectoEntity)
    private readonly proyectoRepository: Repository<ProyectoEntity>,
  ) {}

  async crearProyecto(proyecto: ProyectoEntity): Promise<ProyectoEntity> {
    if (proyecto.presupuesto <= 0 || proyecto.titulo.length <= 15) {
      throw new BusinessLogicException(
        'Presupuesto debe ser mayor a 0 y título mayor a 15 caracteres',
        BusinessError.PRECONDITION_FAILED,
      );
    }
    return await this.proyectoRepository.save(proyecto);
  }

  async avanzarProyecto(id: number): Promise<ProyectoEntity> {
    const proyecto = await this.proyectoRepository.findOne({ where: { id } });
    if (!proyecto)
      throw new BusinessLogicException(
        'Proyecto no encontrado',
        BusinessError.NOT_FOUND,
      );

    if (proyecto.estado >= 4)
      throw new BusinessLogicException(
        'El proyecto ya está en su estado máximo 4',
        BusinessError.PRECONDITION_FAILED,
      );

    proyecto.estado += 1;
    return await this.proyectoRepository.save(proyecto);
  }

  async findAllEstudiantes(id: number): Promise<any[]> {
    const proyecto = await this.proyectoRepository.findOne({
      where: { id },
      relations: ['estudiantes'],
    });
    if (!proyecto)
      throw new BusinessLogicException(
        'Proyecto no encontrado',
        BusinessError.NOT_FOUND,
      );

    return proyecto.estudiantes;
  }
}
