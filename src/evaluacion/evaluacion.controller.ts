import { Controller, UseInterceptors, Post, Body } from '@nestjs/common';

import { EvaluacionDto } from './evaluacion.dto/evaluacion.dto';
import { EvaluacionEntity } from './evaluacion.entity';
import { EvaluacionService } from './evaluacion.service';
import { plainToInstance } from 'class-transformer';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors/business-errors.interceptor';

@Controller('evaluaciones')
@UseInterceptors(BusinessErrorsInterceptor)
export class EvaluacionController {
  constructor(private readonly evaluacionService: EvaluacionService) {}

  @Post()
  async crearEvaluacion(@Body() evaluacionDto: EvaluacionDto) {
    const evaluacion: EvaluacionEntity = plainToInstance(
      EvaluacionEntity,
      evaluacionDto,
    );
    return await this.evaluacionService.crearEvaluacion(evaluacion);
  }
}
