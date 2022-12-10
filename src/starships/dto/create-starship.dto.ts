import { IsArray, IsString, IsOptional } from 'class-validator';

export class CreateStarshipDto {
  @IsString()
  name: string;

  @IsString()
  model: string;

  @IsString()
  manufacturer: string;

  @IsString()
  cost_in_credits: string;

  @IsString()
  length: string;

  @IsString()
  max_atmosphering_speed: string;

  @IsString()
  crew: string;

  @IsString()
  passengers: string;

  @IsString()
  cargo_capacity: string;

  @IsString()
  consumables: string;

  @IsString()
  hyperdrive_rating: string;

  @IsString()
  MGLT: string;

  @IsString()
  starship_class: string;

  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  pilots?: string;

  @IsString({ each: true })
  @IsOptional()
  @IsArray()
  films?: string;
}
