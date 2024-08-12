import { IsString } from 'class-validator';

export class BattleDto {
  @IsString()
  pokemon1Id: string;

  @IsString()
  pokemon2Id: string;
}
