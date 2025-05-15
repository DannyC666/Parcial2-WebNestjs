import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProfesorEntity } from './profesor.entity';
import { EvaluacionEntity } from 'src/evaluacion/evaluacion.entity';

@Injectable()
export class ProfesorService {
  constructor(
    @InjectRepository(ProfesorEntity)
    private readonly profesorRepository: Repository<ProfesorEntity>,
    @InjectRepository(EvaluacionEntity)
    private readonly evaluacionRepository: Repository<EvaluacionEntity>,
  ) {}

  async crearProfesor(profesor: ProfesorEntity): Promise<ProfesorEntity> {
    if (/^\d{5}$/.test(profesor.extension.toString())) {
      return await this.profesorRepository.save(profesor);
    }
  }

  async asignarEvaluador(id: number): Promise<void> {
    const evaluaciones = await this.evaluacionRepository.find({
      where: { evaluador: { id } },
      relations: ['evaluador'],
    });
    if (evaluaciones.length <= 3) {
      
    );
    }
  }
}
