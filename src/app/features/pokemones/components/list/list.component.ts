import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PokemonService } from '../../services/pokemon.service';
import { Pokemon } from '../../models/pokemones.model';

@Component({
  selector: 'app-list',
  standalone: false,
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit{
  poke: Pokemon[] = [];

  cargando = true; 
  error = false;

  offset = 0;

  constructor(private pokemonService: PokemonService) {}
  /**
   * Suscripción a card
   */

  ngOnInit(): void {
    this.cargarPokemones()  //llama cargar pokemones 
}

  /**
   * metodo de paginación
   */
  cargarPokemones(){
    this.pokemonService.getPokemones(this.offset).subscribe({
      next: data => {
        this.poke = data;
        this.cargando = false;
      },
      error: () => {
        this.error = true;
        this.cargando = false;
      }
    });
  }

  /**
   * carga la siguiente página
   */
  siguiente(){
    this.cargando = true;
    this.offset = this.offset + 20;
    this.cargarPokemones()
  }


  /**
   * Devuelve a la anterior página 
   */
  anterior(){
    if (this.offset > 0){
    this.cargando = true;
    this.offset = this.offset - 20;
    this.cargarPokemones()
    }
  }
}
