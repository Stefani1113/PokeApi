import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, Observable, switchMap } from 'rxjs';
import { Pokemon } from '../models/pokemones.model';
import { Poke } from '../models/poke';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private API_URL = `https://pokeapi.co/api/v2/pokemon?limit=20&offset=0`;

  constructor(private http: HttpClient) { }

  /**
   * Traigo modelo Pokemon de los pokemones
   * @returns 
   */

  getPokemones(): Observable<Pokemon[]> {
    return this.http.get<{ results: Pokemon[] }>(`${this.API_URL}`).pipe(
      map((res) => res.results), //Extrayendo objeto por el momento 
    );
  } 

  getPokemonesPoke(poke: Pokemon): Observable<Pokemon> {
    return this.http.get<Poke>(`${this.API_URL}/:name=${poke.name}`).pipe(
      map((pokemon) => {
        return {
          ...poke,
        }
      })
    )
  }

  /**
   * Mapeo y Retorno nombre y url 
   * @param pokemones 
   * @returns 
   */
  mapPokemones(pokemones: any[]) {
    return pokemones.map((pokemon) => {
      return {
        name: pokemon.name,
        url: pokemon.url,
      }
    });

  }

}
