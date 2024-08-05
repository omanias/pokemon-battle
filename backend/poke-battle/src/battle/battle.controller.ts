import { Controller, Post, Body } from '@nestjs/common';
import { BattleService } from './battle.service';
import { BattleResult } from './battle-result.entity';

@Controller('battle')
export class BattleController {
  constructor(private readonly battleService: BattleService) {}

  @Post()
  battle(
    @Body() battleDto: { pokemon1Id: number; pokemon2Id: number },
  ): Promise<BattleResult> {
    return this.battleService.battle(
      battleDto.pokemon1Id,
      battleDto.pokemon2Id,
    );
  }
}
