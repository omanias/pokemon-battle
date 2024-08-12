import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BattleController } from './battle.controller';
import { BattleService } from './battle.service';
import { BattleResult } from './battle-result.entity';
import { Pokemon } from '../pokemon/pokemon.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pokemon, BattleResult])],
  controllers: [BattleController],
  providers: [BattleService],
})
export class BattleModule {}
