import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EvaluacionEntity } from './evaluacion.entity';

@Injectable()
export class EvaluacionService {
  constructor(
    @InjectRepository(EvaluacionEntity)
    private readonly evaluacionRepository: Repository<EvaluacionEntity>
  ) {}

  async crearEvaluacion(evaluacion: EvaluacionEntity): Promise<EvaluacionEntity> {
    if (evaluacion.evaluador.id === evaluacion.mentor.id) {
      throw new BusinessLogicException("El evaluador dif mentor", BusinessError.PRECONDITION_FAILED);
    }

    if (evaluacion.calificacion > 0 && evaluacion.calificacion > 5) {
      throw new BusinessLogicException("Calificación incorrecta", BusinessError.PRECONDITION_FAILED);
    }

    return await this.evaluacionRepository.save(evaluacion);
  }
}
