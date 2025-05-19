import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ProyectoEntity } from '../proyecto/proyecto.entity';
import { ProfesorEntity } from 'src/profesor/profesor.entity';

@Entity()
export class EvaluacionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ProyectoEntity, (proyecto) => proyecto.evaluaciones)
  proyecto: ProyectoEntity;

  @ManyToOne(() => ProfesorEntity, (profesor) => profesor.mentor)
  evaluador: ProfesorEntity;
}
