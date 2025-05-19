/* eslint-disable prettier/prettier */
import { Controller, UseInterceptors, Post, Body, Delete, Param, } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors/business-errors.interceptor';
import { EstudianteService } from './estudiante.service';
import { EstudianteDto } from './estudiante.dto/estudiante.dto';
import { EstudianteEntity } from './estudiante.entity';

@Controller('estudiantes')
@UseInterceptors(BusinessErrorsInterceptor)
export class EstudianteController {
  constructor(private readonly estudianteService: EstudianteService) {}

  @Post()
  async crearEstudiante(@Body() estudianteDto: EstudianteDto) {
    const estudiante: EstudianteEntity = plainToInstance(EstudianteEntity, estudianteDto);
    return await this.estudianteService.crearEstudiante(estudiante);
  }

  @Delete(':id')
  async eliminarEstudiante(@Param('id') id: number) {
    return await this.estudianteService.eliminarEstudiante(id);
  }
}
