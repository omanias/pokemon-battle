import { Controller, Post, Body } from '@nestjs/common';
import { BattleService } from './battle.service';
import { BattleDto } from './battle.dto';
import { BattleResult } from './battle-result.entity';

@Controller('battle')
export class BattleController {
  constructor(private readonly battleService: BattleService) {}

  @Post()
  battle(@Body() battleDto: BattleDto): Promise<BattleResult> {
    return this.battleService.battle(
      battleDto.pokemon1Id,
      battleDto.pokemon2Id,
    );
  }
}
