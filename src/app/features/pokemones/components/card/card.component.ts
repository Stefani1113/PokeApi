import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PokemonService } from '../../services/pokemon.service';
import { Pokemon } from '../../models/pokemones.model';

@Component({
  selector: 'app-card',
  standalone: false,
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent implements OnInit{
  pokemones$: Observable<Pokemon[]> = of([]);

  constructor(private pokemonService: PokemonService) {}

  /**
   * Suscripción 
   */

  ngOnInit(): void {
    this.pokemonService.getPokemones().subscribe({ next: (data) => console.log(data) });
  }
}
