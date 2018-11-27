import { Component } from '@angular/core';
import { WfilterPipe } from 'wngx-filter';

export interface IUser {
  nome: string;
  idade: number;
}

@Component({
  selector: 'wl-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'wngx-library';

  filtroString: string;
  search: any;
  search2: any;
  search3: any;
  search4: any;
  search5: any;
  search6: any;

  constructor(private pipe: WfilterPipe) {
  }

  getStrings() {
    const retorno = [];
    for (let i = 0; i < 10; i++) {
      retorno.push(`Item ${i}`);
    }
    return retorno;
  }

  getComplexType(): IUser[] {
    const retorno: IUser[] = [];
    for (let i = 0; i < 10; i++) {
      retorno.push({nome: `Nome ${i}`, idade: i});
    }
    return retorno;
  }

  getComplexTypesExtends() {
    const retorno = [];
    for (let i = 0; i < 10; i++) {
      const objeto = new Object();
      objeto['nome'] = `Nome ${i}`;
      objeto['idade'] = i;

      const N1 = new Object();
      N1['valor1'] = `Nível1 N1 ${i}`;

      const N2 = new Object();
      N2['valor2'] = `valor N2 ${i}`;
      N1['n2'] = N2;

      objeto['n1'] = N1;

      retorno.push(objeto);
    }
    retorno[0].n1.n2.valor2 = 'Pável';
    return retorno;

  }

  public filtrar(search4) {
    const r = this.pipe.transform(this.getComplexTypesExtends(),
                                  [{field: 'n1.n2.valor2', value: search4}]);
    return r;
  }

}
