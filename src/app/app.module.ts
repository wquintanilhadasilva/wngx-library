import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { WngxFilterModule } from './../../projects/wngx-filter/src/lib/wngx-filter.module';
import { WfilterPipe } from './../../projects/wngx-filter/src/lib/pipes/wfilter.pipe';
// import { WngxFilterModule, WfilterPipe } from 'wngx-filter';

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
