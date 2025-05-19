import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ProyectoEntity } from '../proyecto/proyecto.entity';
import { EvaluacionEntity } from 'src/evaluacion/evaluacion.entity';
@Entity()
export class ProfesorEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  cedula: number;

  @Column()
  nombre: string;

  @Column()
  departamento: string;

  @Column()
  extension: number;

  @Column()
  esParEvaluadro: boolean;

  @OneToMany(() => ProyectoEntity, (proyecto) => proyecto.mentor)
  mentorias: ProyectoEntity[];

  @OneToMany(() => EvaluacionEntity, (evaluacion) => evaluacion.evaluador)
  mentor: EvaluacionEntity[];
}
