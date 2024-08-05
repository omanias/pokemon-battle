import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BattleService } from './battle.service';
import { BattleResult } from './battle-result.entity';
import { Pokemon } from '../pokemon/pokemon.entity';
import { PokemonModule } from '../pokemon/pokemon.module'; // Asegúrate de que este módulo esté importado

@Module({
  imports: [TypeOrmModule.forFeature([BattleResult, Pokemon]), PokemonModule],
  providers: [BattleService],
  exports: [BattleService],
})
export class BattleModule {}
