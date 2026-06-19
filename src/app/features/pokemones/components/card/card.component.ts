import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PokemonService } from '../../services/pokemon.service';
import { Pokemones } from '../../models/pokemones.model';

@Component({
  selector: 'app-card',
  standalone: false,
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent implements OnInit{
  pokemones$: Observable<Pokemones[]> = of([]);

  constructor(private PokemonService: PokemonService) {}

  ngOnInit(): void {
    this.PokemonService.getPokemones().subscribe({ next: (data) => console.log(data) });
  }
}
