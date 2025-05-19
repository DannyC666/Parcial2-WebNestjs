import {
  Body,
  Controller,
  Param,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors/business-errors.interceptor';
import { ProfesorDto } from './profesor.dto/profesor.dto';
import { ProfesorEntity } from './profesor.entity';
import { ProfesorService } from './profesor.service';

@Controller('profesores')
@UseInterceptors(BusinessErrorsInterceptor)
export class ProfesorController {
  constructor(private readonly profesorService: ProfesorService) {}

  @Post()
  async crearProfesor(@Body() profesorDto: ProfesorDto) {
    const profesor: ProfesorEntity = plainToInstance(
      ProfesorEntity,
      profesorDto,
    );
    return await this.profesorService.crearProfesor(profesor);
  }

  @Patch(':id/asignar-evaluador')
  async asignarEvaluador(@Param('id') id: number) {
    return await this.profesorService.asignarEvaluador(id);
  }
}
