import { IsInt, IsNotEmpty, Min, Max } from 'class-validator';

export class EvaluacionDto {
  @IsInt()
  @Min(0)
  @Max(5)
  @IsNotEmpty()
  readonly calificacion: number;

  @IsInt()
  @IsNotEmpty()
  readonly proyectoId: number;

  @IsInt()
  @IsNotEmpty()
  readonly evaluadorId: number;
}
