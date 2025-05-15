import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  OneToMany,
} from 'typeorm';

import { EstudianteEntity } from '../estudiante/estudiante.entity';
import { ProfesorEntity } from '../profesor/profesor.entity';
import { EvaluacionEntity } from '../evaluacion/evaluacion.entity';
@Entity()
export class ProyectoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titulo: string;

  @Column()
  area: string;

  @Column()
  presupuesto: number;

  @Column()
  notaFinal: number;

  @Column()
  estado: number;

  @Column()
  fechaInicio: string;

  @Column()
  fechaFin: string;

  @ManyToMany(() => EstudianteEntity, (estudiante) => estudiante.proyectos)
  estudiantes: EstudianteEntity[];

  @ManyToOne(
    () => EstudianteEntity,
    (estudiante) => estudiante.proyectosLiderados,
  )
  lider: EstudianteEntity;

  @ManyToOne(() => ProfesorEntity, (profesor) => profesor.mentorias)
  mentor: EstudianteEntity;

  @OneToMany(() => EvaluacionEntity, (evaluacion) => evaluacion.proyecto)
  evaluaciones: EstudianteEntity[];
}
