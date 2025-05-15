import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';

import { ProyectoEntity } from '../proyecto/proyecto.entity';

@Entity()
export class EstudianteEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cedula: number;

  @Column()
  nombre: string;

  @Column()
  semestre: number;

  @Column()
  programa: string;

  @Column()
  promedio: number;

  @ManyToMany(() => ProyectoEntity, (proyecto) => proyecto.estudiantes)
  @JoinTable()
  proyectos: ProyectoEntity[];

  @OneToMany(() => ProyectoEntity, (proyecto) => proyecto.lider)
  proyectosLiderados: ProyectoEntity[];
}
