import { Component } from '@angular/core';
// import { WfilterPipe } from 'wngx-filter';
import { WfilterPipe } from './../../projects/wngx-filter/src/lib/pipes/wfilter.pipe';

export interface Phone {
  ddd: string;
  number: string;
}

export interface IUser {
  nome: string;
  idade: number;
  phone: Phone;
}

@Component({
  selector: 'wl-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'wngx-library';

  filter0: string;
  filter1: string;
  filter2: string;
  filter3: string;
  filter4: string;

  constructor(private pipe: WfilterPipe) {

  }

  getStrings(): string[] {
    const retorno = [];
    for (let i = 0; i < 10; i++) {
      retorno.push(`Item ${i}`);
    }
    return retorno;
  }

  getComplexType(): IUser[] {
    const retorno: IUser[] = [];
    for (let i = 0; i < 10; i++) {
      retorno.push({nome: `Nome ${i}`, idade: i, phone: {ddd: '0' + i, number: '358799-' + i}});
    }
    retorno.push({nome: `Nómê com acêntó`, idade: 10,  phone: {ddd: '062', number: '358799-10'}});
    retorno.push({nome: `Nómê com trëma`, idade: 8,  phone: {ddd: '068', number: '358799-88'}});
    retorno.push({nome: `Nómê com pável`, idade: 7,  phone: {ddd: '067', number: '358799-77'}});
    return retorno;
  }

  getDataFilterDeclarativeCode(filter): IUser[] {
    return this.pipe.transform(this.getComplexType(), [{field: 'nome', value: filter}]);
  }

}
