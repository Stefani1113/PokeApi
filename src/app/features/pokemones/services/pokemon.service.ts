import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, Observable, switchMap } from 'rxjs';
import { Poke, Pokemon } from '../models/pokemones.model';
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
      map((results) => this.mapPokemones(results.results)), // Saco el array del objeto results 
      switchMap((pokemones) => {
        const pokemonesWithPoke$ = pokemones.map((poke) => this.getPokemonesPoke(poke));
        return forkJoin(pokemonesWithPoke$);
      }),
    );
  } 

  /**
   * trae los datos de Poke y Pokemones
   * @param poke 
   * @returns 
   */

  getPokemonesPoke(poke: Pokemon): Observable<Pokemon> {
    return this.http.get<Poke>(`https://pokeapi.co/api/v2/pokemon/${poke.name}`).pipe(
      map((pokemon) => {
        return {
          ...poke,
          ...this.mapPoke(pokemon), //llamo el mapeo de Poke
        }
      })
    )
  }

  /**
   * Mapeo y Retorno nombre y url 
   * @param pokemones 
   * @returns 
   */
  mapPokemones(pokemones: Pokemon[]) {
    return pokemones.map((pokemon) => {
      return {
        name: pokemon.name,
        url: pokemon.url,
      }
    });
  }

  /**
   * Mapeo y retorno de Poke
   * @param poke 
   * @returns 
   */

  mapPoke(poke: Poke) {
      return {
        name: poke.name,
        abilities: poke.abilities.map((a) => ({ //mapeamos para que solo traiga ability, is_hidden y slot
          ability: {
            name : poke.abilities.map((a) => a.ability.name), //mapeamos para que solo traiga name
          },
          is_hidden: poke.abilities.map((a) => a.is_hidden),
          slot: poke.abilities.map((a) => a.slot),
      })),
      base_experience: poke.base_experience,
      sprites: {
        back_default: poke.sprites.back_default,
        front_default: poke.sprites.front_default,
      }
      }
    };
  }
