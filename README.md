# wngx-library

Angular 7 generic components for array filter in *ngFor directive.

Original project (migrate from): [w-ng5](https://www.npmjs.com/package/w-ng5) -> lib release compatible with version angular ^5x.

# Objective

Filter records of your listings with simple strings using a single field or multiple fields on plan objects. Filter also by using fields in non-plan structured objects by observing one or more attributes or sub-attributes of these objects by browsing their OGNL properties.

# Details

Details about this project and user tutorial

## Composition package

* Generic Filter for using in directives ngFor

## How to install and configure

For use this components, before, install this package with [npm](https://www.npmjs.com/package/wngx-filter):

    npm install wngx-filter --save

After, import module in app.module
    
    ...
    import { WngxFilterModule, WfilterPipe } from 'wngx-filter';

In the next step, add in declare section of app.module:

    imports: [
      WngxFilterModule,
      ...
    ],
    providers: [..., WfilterPipe, ...],

And, enjoy....

## Sample use


### Domain model using in Samples

```

  export interface Phone {
    ddd: string;
    number: number;
  }

  export interface IUser {
    nome: string;
    idade: number;
    phone: Phone;
  }

```

**Method provider data list of simple string for using in samples**

```

  getStrings() {
    const retorno = [];
    for (let i = 0; i < 10; i++) {
      retorno.push(`Item ${i}`);
    }
    return retorno;
  }

```

**Method provider array complex data for using in samples:**

```

  getComplexType(): IUser[] {
    const retorno: IUser[] = [];
    for (let i = 0; i < 10; i++) {
      retorno.push({nome: `Nome ${i}`, idade: i});
    }
    retorno.push({nome: `Nómê com acêntó`, idade: 10});
    retorno.push({nome: `Nómê com trëma`, idade: 10});
    retorno.push({nome: `Nómê com pável`, idade: 10});
    return retorno;
  }

```



### Using in HTML

**Filter simple string array (no complex type):**
```

  <label>String filter 0 - Simple string array (no complex type) </label>
    <br>
    <input type="text"  [(ngModel)]="filter0">
    <br>
    <h5>Using simple string array filter</h5>
    <ul>
      <li *ngFor="let s of getStrings() | wfilter:filter0">
        {{s}}
      </li>
    </ul>

    <hr>

```

**Field filter in Level 1 (fields 'nome' and 'idade' of IUser interface):**

```

    <label>String filter 1 - Field filter in Level 1</label>
    <br>
    <input type="text"  [(ngModel)]="filter1">
    <br>
    <h5>Using complex type and field level 1 filter</h5>
    <ul>
      <li *ngFor="let s of getComplexType() | wfilter: [{field:'nome', value:filter1}, {field:'idade', value:filter1}]">
        name: {{s.nome}} - idade: {{s.idade}} - phone.ddd: {{s.phone.ddd}} - phone.number: {{s.phone.number}}
      </li>
    </ul>
    <hr>

```

**Field filter in Level 2 (String & Number) (fields 'ddd' and 'number' of 'phone' atribute of IUser interface):**

```
    <label>String and Number filter 2 - Field filter in Level 2</label>
    <br>
    <input type="text"  [(ngModel)]="filter2">
    <br>
    <h5>Using complex type and field level 2 filter</h5>
    <ul>
      <li *ngFor="let s of getComplexType() | wfilter: [{field:'phone.ddd', value:filter2}, {field:'phone.number', value:filter2}]">
        name: {{s.nome}} - idade: {{s.idade}} - phone.ddd: {{s.phone.ddd}} - phone.number: {{s.phone.number}}
      </li>
    </ul>
    <hr>

```

**Filter in all fields of object in all levels (String & Number):**

```

    <label>String filter 3 - Any Fileds of Object filter</label>
    <br>
    <input type="text"  [(ngModel)]="filter3">
    <br>
    <h5>Using complex type and any field filter</h5>
    <ul>
      <li *ngFor="let s of getComplexType() | wfilter: [{field:'nome',value:filter3},
                                                  {field:'idade',value:filter3},
                                                  {field:'phone.ddd',value:filter3},
                                                  {field:'phone.number',value:filter3}]">
          name: {{s.nome}} - idade: {{s.idade}} - phone.ddd: {{s.phone.ddd}} - phone.number: {{s.phone.number}}
      </li>
    </ul>
    <hr>

```

### Filtering in declarative code

**HTML:**

```

  <label>String filter 4 - Filter in declarative code</label>
  <br>
  <input type="text"  [(ngModel)]="filter4">
  <br>
  <h5>Using filter in declarative code</h5>
  <ul>
    <li *ngFor="let s of getDataFilterDeclarativeCode(filter4)">
      name: {{s.nome}} - idade: {{s.idade}} - phone.ddd: {{s.phone.ddd}} - phone.number: {{s.phone.number}}
    </li>
  </ul>
  <hr>


```

**Typescript code:**

Import component in typescript file header, for example, *my-component.ts*:

```

  import { WfilterPipe } from 'wngx-filter';

```

After, import the component in constructor of component

```

 constructor(private pipe: WfilterPipe) {}

```
Then use the pipe to filter in any method:

```

  getDataFilterDeclarativeCode(filter): IUser[] {
    return this.pipe.transform(this.getComplexType(),  // Get array data to filter
        [
          {field: 'nome', value: filter},         // Filter in nome field - level 1
          {field: 'phone.number', value: filter}  // Filter in phone.number field - level 2
        ]);
  }

```

This component work with **infinite attribute level filters** ...

# Project info - source code

This project is stored in [wngx-library](https://github.com/wquintanilhadasilva/wngx-library) and was generated with [Angular CLI](https://github.com/angular/angular-cli) version ^1.7.
