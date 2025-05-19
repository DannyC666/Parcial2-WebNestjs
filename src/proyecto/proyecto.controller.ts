import { Controller } from '@nestjs/common';
import {
  Body,
  Get,
  Param,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common/decorators';
import { ProyectoEntity } from './proyecto.entity';
import { ProyectoService } from './proyecto.service';
import { plainToInstance } from 'class-transformer';
import { ProyectoDto } from './proyecto.dto/proyecto.dto';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors/business-errors.interceptor';

@Controller('proyectos')
@UseInterceptors(BusinessErrorsInterceptor)
export class ProyectoController {
  constructor(private readonly proyectoService: ProyectoService) {}

  @Post()
  async crearProyecto(@Body() proyectoDto: ProyectoDto) {
    const proyecto: ProyectoEntity = plainToInstance(
      ProyectoEntity,
      proyectoDto,
    );
    return await this.proyectoService.crearProyecto(proyecto);
  }

  @Patch(':id/avanzar')
  async avanzarProyecto(@Param('id') id: number) {
    return await this.proyectoService.avanzarProyecto(id);
  }

  @Get(':id/estudiantes')
  async obtenerEstudiantes(@Param('id') id: number) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return await this.proyectoService.findAllEstudiantes(id);
  }
}
