import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { WngxFilterModule, WfilterPipe } from 'wngx-filter';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    WngxFilterModule,
  ],
  providers: [WfilterPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
