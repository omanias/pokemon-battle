import { Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Pokemon } from '../pokemon/pokemon.entity';

@Entity()
export class BattleResult {
  @PrimaryColumn()
  id: string;

  @ManyToOne(() => Pokemon)
  pokemon1: Pokemon;

  @ManyToOne(() => Pokemon)
  pokemon2: Pokemon;

  @ManyToOne(() => Pokemon)
  winner: Pokemon;
}
