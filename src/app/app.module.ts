import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CardComponent } from './features/pokemones/components/card/card.component';
import { ListComponent } from './features/pokemones/components/list/list.component';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    ListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
