import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PokemonModule } from './pokemon/pokemon.module';
import { BattleModule } from './battle/battle.module';
import { Pokemon } from './pokemon/pokemon.entity';
import { BattleResult } from './battle/battle-result.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [Pokemon, BattleResult],
      synchronize: true,
    }),
    PokemonModule,
    BattleModule,
  ],
})
export class AppModule {}
