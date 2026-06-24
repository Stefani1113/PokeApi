import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, Observable, switchMap } from 'rxjs';
import { PokemonList, Pokemon } from '../models/pokemones.model';
import { PokeReq } from '../models/poke-req.model';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private API_URL = `https://pokeapi.co/api/v2/pokemon?limit=20&offset=0`;

  constructor(private http: HttpClient) { }

  /**
   * Traigo modelo Pokemon de la API
   * @returns 
   */

  getPokemones(): Observable<Pokemon[]> {
    return this.http.get<{ results : Pokemon[]}>(`${this.API_URL}`).pipe(
      map((results) => results.results), // traigo array de results {name,url} 
      switchMap((pokemones) => {
        const pokemonesWithPokemon$ = pokemones.map((poke) => this.getPokemonesPokemon(poke));
        return forkJoin(pokemonesWithPokemon$); // junta los 20 objetos
      }), 
    );
  } 

  /**
   * junta en una sola lista los datos de Poke y Pokemones
   * @param poke 
   * @returns 
   */

  getPokemonesPokemon(poke: PokemonList): Observable<Pokemon> {
    return this.http.get<PokeReq>(`https://pokeapi.co/api/v2/pokemon/${poke.name}`).pipe(
      map((pokeReq) => ({
        ...this.mapPoke(pokeReq),
        url: poke.url, // le paso url de Pokemon a pokeReq
      }))
    );
  }

  /**
   * Mapeo y retorno de Poke
   * @param poke 
   * @returns 
   */

  mapPoke(pokeReq: PokeReq){
      return {
      name: pokeReq.name,
      abilities: pokeReq.abilities.map((a) => ({ //mapeamos para que solo traiga ability, is_hidden y slot
        ability: {name: a.ability.name},
        is_hidden: a.is_hidden,
        slot: a.slot,
      })),
      base_experience: pokeReq.base_experience,
      sprites: {
        back_default: pokeReq.sprites.back_default,
        front_default: pokeReq.sprites.front_default,
        other: {
          dream_world: {
            front_default: pokeReq.sprites.other.dream_world.front_default
          }
        }
      }
    };
  }
}