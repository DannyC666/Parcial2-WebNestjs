import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EstudianteEntity } from './estudiante.entity';
import {
  BusinessError,
  BusinessLogicException,
} from 'src/shared/errors/business-errors';

@Injectable()
export class EstudianteService {
  constructor(
    @InjectRepository(EstudianteEntity)
    private readonly estudianteRepository: Repository<EstudianteEntity>,
  ) {}

  async crearEstudiante(
    estudiante: EstudianteEntity,
  ): Promise<EstudianteEntity> {
    if (estudiante.promedio <= 3.2 || estudiante.semestre < 4) {
      throw new BusinessLogicException(
        'Estudiante no cumple con requisitos de promedio o semestre',
        BusinessError.PRECONDITION_FAILED,
      );
    }
    return await this.estudianteRepository.save(estudiante);
  }

  async eliminarEstudiante(id: number) {
    const estudiante = await this.estudianteRepository.findOne({
      where: { id },
      relations: ['proyectos'],
    });
    if (!estudiante)
      throw new BusinessLogicException(
        'Estudiante no encontrado',
        BusinessError.NOT_FOUND,
      );

    const proyectosActivos = estudiante.proyectos.filter((p) => p.estado < 4);
    if (proyectosActivos.length > 0)
      throw new BusinessLogicException(
        'Estudiante tiene proyectos activos',
        BusinessError.PRECONDITION_FAILED,
      );

    await this.estudianteRepository.remove(estudiante);
  }
}
