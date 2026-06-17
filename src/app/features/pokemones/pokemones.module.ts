import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaComponent } from './components/lista/lista.component';
import { ListComponent } from './components/list/list.component';
import { CardComponent } from './components/card/card.component';
import { ServicesComponent } from './services/services.component';
import { PokemonServiceTsComponent } from './services/pokemon.service.ts/pokemon.service.ts.component';



@NgModule({
  declarations: [
    ListaComponent,
    ListComponent,
    CardComponent,
    ServicesComponent,
    PokemonServiceTsComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PokemonesModule { }
