import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsString,
  Matches,
} from 'class-validator';

export class ProfesorDto {
  @IsInt()
  @IsNotEmpty()
  readonly cedula: number;

  @IsString()
  @IsNotEmpty()
  readonly nombre: string;

  @IsString()
  @IsNotEmpty()
  readonly departamento: string;

  @IsInt()
  @Matches(/^\d{5}$/, {
    message: 'La extensión debe tener exactamente 5 dígitos',
  })
  readonly extension: number;

  @IsBoolean()
  readonly esParEvaluador: boolean;
}
