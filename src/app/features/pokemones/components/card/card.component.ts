import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PokemonService } from '../../services/pokemon.service';
import { Poke, Pokemon } from '../../models/pokemones.model';

@Component({
  selector: 'app-card',
  standalone: false,
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent implements OnInit{
  pokemones$: Observable<Pokemon[]> = of([]);
  poke: Poke[] = [];

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
