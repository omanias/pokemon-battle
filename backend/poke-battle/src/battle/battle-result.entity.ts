import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Pokemon } from '../pokemon/pokemon.entity';

@Entity()
export class BattleResult {
  @PrimaryGeneratedColumn()
  id: number; // Usar número para la columna id

  @ManyToOne(() => Pokemon, { eager: true })
  pokemon1: Pokemon;

  @ManyToOne(() => Pokemon, { eager: true })
  pokemon2: Pokemon;

  @ManyToOne(() => Pokemon, { eager: true })
  winner: Pokemon;
}
