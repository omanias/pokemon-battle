import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pokemon } from '../pokemon/pokemon.entity';
import { BattleResult } from './battle-result.entity';

@Injectable()
export class BattleService {
  constructor(
    @InjectRepository(Pokemon)
    private pokemonRepository: Repository<Pokemon>,
    @InjectRepository(BattleResult)
    private battleResultRepository: Repository<BattleResult>,
  ) {}

  async battle(pokemon1Id: string, pokemon2Id: string): Promise<BattleResult> {
    const pokemon1 = await this.pokemonRepository.findOneBy({
      id: pokemon1Id,
    });
    const pokemon2 = await this.pokemonRepository.findOneBy({
      id: pokemon2Id,
    });

    let attacker = pokemon1.speed > pokemon2.speed ? pokemon1 : pokemon2;
    let defender = attacker === pokemon1 ? pokemon2 : pokemon1;

    while (pokemon1.hp > 0 && pokemon2.hp > 0) {
      const damage = Math.max(1, attacker.attack - defender.defense);
      defender.hp -= damage;

      if (defender.hp <= 0) break;

      [attacker, defender] = [defender, attacker];
    }

    const winner = pokemon1.hp > 0 ? pokemon1 : pokemon2;

    const battleResult = this.battleResultRepository.create({
      pokemon1,
      pokemon2,
      winner,
    });

    await this.battleResultRepository.save(battleResult);

    return battleResult;
  }
}
