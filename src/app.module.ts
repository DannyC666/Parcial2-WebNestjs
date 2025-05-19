import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExampleModule } from './example/example.module';
import { ExampleEntity } from './example/example.entity';
import { EstudianteModule } from './estudiante/estudiante.module';
import { ProyectoModule } from './proyecto/proyecto.module';
import { ProfesorModule } from './profesor/profesor.module';
import { EvaluacionModule } from './evaluacion/evaluacion.module';
import { EstudianteEntity } from './estudiante/estudiante.entity';
import { ProyectoEntity } from './proyecto/proyecto.entity';
import { ProfesorEntity } from './profesor/profesor.entity';
import { EvaluacionEntity } from './evaluacion/evaluacion.entity';

@Module({
  imports: [
    EstudianteModule,
    ProyectoModule,
    ProfesorModule,
    EvaluacionModule,
    ExampleModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'parcial',
      entities: [
        EstudianteEntity,
        ProyectoEntity,
        ProfesorEntity,
        EvaluacionEntity,
        ExampleEntity,
      ],
      dropSchema: true,
      synchronize: true,
      // keepConnectionAlive: true
    }),
    EstudianteModule,
    ProyectoModule,
    ProfesorModule,
    EvaluacionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
