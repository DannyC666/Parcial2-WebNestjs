import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EstudianteEntity } from './estudiante.entity';

@Injectable()
export class EstudianteService {
  constructor(
    @InjectRepository(EstudianteEntity)
    private readonly estudianteRepository: Repository<EstudianteEntity>,
  ) {}

  async crearEstudiante(
    estudiante: EstudianteEntity,
  ): Promise<EstudianteEntity> {
    if (estudiante.promedio >= 3.2 || estudiante.semestre > 4) {
      return await this.estudianteRepository.save(estudiante);
    }
  }
  async eliminarEstudiante(id: number) {
    const estudiante = await this.estudianteRepository.findOne({
      where: { id },
      relations: ['proyectos'],
    });

    const proyectosActivos = estudiante.proyectos.filter((p) => p.estado < 4);
    if (proyectosActivos.length > 0)
      await this.estudianteRepository.remove(estudiante);
  }
}
