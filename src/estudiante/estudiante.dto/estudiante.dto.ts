import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class EstudianteDto {
  @IsInt()
  @Min(1)
  readonly cedula: number;

  @IsString()
  @IsNotEmpty()
  readonly nombre: string;

  @IsInt()
  @Min(1)
  readonly semestre: number;

  @IsString()
  @IsNotEmpty()
  readonly programa: string;

  @IsInt()
  @Min(0)
  readonly promedio: number;
}
