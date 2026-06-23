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

  constructor(private pokemonService: PokemonService) {}
  /**
   * Suscripción a card
   */

  cargando = true; 
  error = false;

  ngOnInit(): void {
    this.pokemonService.getPokemones().subscribe({
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
}
