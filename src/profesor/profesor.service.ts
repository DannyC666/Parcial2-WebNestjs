import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProfesorEntity } from './profesor.entity';
import { EvaluacionEntity } from 'src/evaluacion/evaluacion.entity';
import {
  BusinessError,
  BusinessLogicException,
} from 'src/shared/errors/business-errors';

@Injectable()
export class ProfesorService {
  constructor(
    @InjectRepository(ProfesorEntity)
    private readonly profesorRepository: Repository<ProfesorEntity>,
    @InjectRepository(EvaluacionEntity)
    private readonly evaluacionRepository: Repository<EvaluacionEntity>,
  ) {}

  async crearProfesor(profesor: ProfesorEntity): Promise<ProfesorEntity> {
    if (!/^\d{5}$/.test(profesor.extension.toString())) {
      throw new BusinessLogicException(
        'La extensión debe tener 5 dígitos',
        BusinessError.PRECONDITION_FAILED,
      );
    }
    return await this.profesorRepository.save(profesor);
  }
  async asignarEvaluador(id: number): Promise<void> {
    const evaluaciones = await this.evaluacionRepository.find({
      where: { evaluador: { id } },
      relations: ['evaluador'],
    });
    if (evaluaciones.length >= 3) {
      throw new BusinessLogicException(
        'El profesor tiene más de 3 evaluaciones asignadas',
        BusinessError.PRECONDITION_FAILED,
      );
    }
  }
}
