import { Pipe, PipeTransform } from '@angular/core';
import { ASCIIFolder } from './ASCIIFolder';

export interface FilterParam {
  field: string;
  value: string | FilterParam[];
}

@Pipe({
  name: 'wfilter',
  pure: true,
})
export class WfilterPipe implements PipeTransform {

  transform(values: any[], filter: FilterParam[] | string | number): any {
    // if values is not array, then return it...
    if (values && !(values instanceof Array)) {
      return values;
    }

    // if filter is null , then return value...
    if (!filter) {
      return values;
    }

    if (filter instanceof Array) {
      return this._checkComplexType(values, filter);
    } else {
      return this._checkSimpleType(values, filter);
    }
  }

  private _checkSimpleType(values: any[], filter: string | number ): any {
    if (!values || !filter) {
      return values;
    }

    const normalizedValues: any[] = [...values];
    const normalizedSearch = this._replaceSpecialChars(
      filter.toString().toLowerCase(),
    );
    return normalizedValues.filter((item) =>
      this._replaceSpecialChars(item.toString())
        .toLowerCase()
        .includes(normalizedSearch),
    );
  }

  private _checkComplexType(values, filter: FilterParam[]): any {
    if (!values || !filter || !filter.length) {
      return values;
    }

    const result = [];

    // find in all records
    values.forEach((row) => {
      let match = false;
      // find in all filters in the array of filters
      filter.forEach((field) => {

        // lê o valor da propriedade
        const v = row[field.field];
        // Se o valor for um array, então faz a chamada recursiva
        if (v !== null && v !== undefined && v instanceof Array) {

          const temp: any[] = this.transform(v, field.value);
          // se houver registro, é pq deve participar do resultado
          match = match || (temp !== null && temp !== undefined && temp.length > 0);

        } else {
          match = match || this._checkValue(row, field);
        }

      });
      if (match) {
        result.push(row); // add row in return
      }
    });

    return result;
  }

  private _checkValue(item, filter): boolean {
    if (!filter || !filter.field || !filter.value) {
      return true;
    }
    if (this._existDot(filter.field)) {
      return this._parseValue(item, filter.value, filter.field);
      // return false;
    } else {
      let value = item[filter.field];
      if (value) {
        value = this._replaceSpecialChars(item[filter.field].toString());
        const normalizedSearch = this._replaceSpecialChars(
          filter.value.toString().toLowerCase(),
        );
        return value.toLowerCase().includes(normalizedSearch);
      } else {
        return false;
      }
    }
  }

  private _parseValue(reference, search, filter): boolean {
    const fields = filter.split('.');
    return this._existFieldValue(reference, search, fields, 0);
  }

  private _existDot(path: string): boolean {
    return path.indexOf('.') > -1;
  }

  private _existFieldValue(obj, search, fieldFind, indexFind: number): boolean {
    // Lê o valor da propriedade
    const ref = obj[fieldFind[indexFind]];
    // Se estiver no último nível...
    if (indexFind === fieldFind.length - 1) {
      // Se tiver valor, confere se contém o que está procurando...
      if (ref) {
        const value = this._replaceSpecialChars(ref.toString());
        const normalizedSearch = this._replaceSpecialChars(
          search.toString().toLowerCase(),
        );
        return value.toLowerCase().includes(normalizedSearch);
      } else {
        return false;
      }
      // Não está no último nível mas há valor na referência
    } else if (ref) {
      return this._existFieldValue(ref, search, fieldFind, ++indexFind);
      // Não está no último nível e não há valor na referência (null)
    } else {
      return false;
    }
  }

  private _replaceSpecialChars(str: string) {
    return ASCIIFolder.fold(str);
  }

}

/**
 * function checkTypeIsObject(v: any): any {
    return typeof v === 'object' && v !== null;
   }
 */
