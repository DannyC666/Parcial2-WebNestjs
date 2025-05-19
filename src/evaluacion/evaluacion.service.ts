import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EvaluacionEntity } from './evaluacion.entity';
import {
  BusinessError,
  BusinessLogicException,
} from 'src/shared/errors/business-errors';

@Injectable()
export class EvaluacionService {
  constructor(
    @InjectRepository(EvaluacionEntity)
    private readonly evaluacionRepository: Repository<EvaluacionEntity>,
  ) {}

  async crearEvaluacion(
    evaluacion: EvaluacionEntity,
  ): Promise<EvaluacionEntity> {
    if (evaluacion.proyecto.mentor.id === evaluacion.evaluador.id) {
      throw new BusinessLogicException(
        'El evaluador dif mentor',
        BusinessError.PRECONDITION_FAILED,
      );
    }

    // eslint-disable-next-line prettier/prettier
    if (evaluacion.proyecto.notaFinal < 0 || evaluacion.proyecto.notaFinal > 5) {
      throw new BusinessLogicException(
        'Calificación incorrecta',
        BusinessError.PRECONDITION_FAILED,
      );
    }

    return await this.evaluacionRepository.save(evaluacion);
  }
}
