import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './components/list/list.component';
import { CardComponent } from './components/card/card.component';


@NgModule({
  declarations: [
    ListComponent,
    CardComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CardComponent,
    ListComponent
  ]
})
export class PokemonesModule { }
