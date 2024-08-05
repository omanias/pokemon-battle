import * as cors from 'cors';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PokemonService } from './pokemon/pokemon.service';
import * as fs from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cors());

  // Obtener una instancia del servicio PokemonService
  const pokemonService = app.get(PokemonService);

  // Leer y procesar los datos
  /*   const data = JSON.parse(fs.readFileSync('pokemon-data.json', 'utf8'));

  for (const pokemon of data.pokemon) {
    await pokemonService.create(pokemon);
  }
  console.log(data); */
  await app.listen(3000);
}
bootstrap();
