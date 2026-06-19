import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, Observable, switchMap } from 'rxjs';
import { Pokemon } from '../models/pokemones.model';
import { PokeReq } from '../models/poke-req.model';
import { PokemonesModule } from '../pokemones.module';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private API_URL = 'https://pokeapi.co/api/v2/pokemon?limit=20&offset=0';

  constructor(private http: HttpClient) { }

  getPokemones(): Observable<Pokemon[]> {
    return this.http.get<PokeReq[]>('${this.API_URL}').pipe(
      map((pokemones) => this.mapPoke(pokemon)),
      switchMap((pokemon) => {
        const pokemonWithPoke$ = pokemon.map((pokemones) => this.getPokemonesPoke(pokemon));
        return forkJoin(pokemonWithPoke$);

      }),
    )
  } 


  mapPokemones(pokemones: Pokemones[]) {
    return pokemones.map((pokemones) => {
      return {
        name: pokemones.name,
        url: pokemones.url,
      }
    });

  }

}
