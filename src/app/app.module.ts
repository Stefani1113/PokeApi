import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { PokemonesModule } from './features/pokemones/pokemones.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    PokemonesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
