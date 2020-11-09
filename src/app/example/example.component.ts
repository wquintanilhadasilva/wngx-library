import { Component } from '@angular/core';
import { WfilterPipe } from 'projects/wngx-filter/src/public_api';

export interface Group {
  id: string;
  name: string;
  tags: string[] | null;
}

export interface Person {
  nationalId: string;
  name: string;
}

export interface User {
  code: string;
  name: string;
  groups: Group[] | null;
  tags: string[] | null;
  person: Person;
}

@Component({
  selector: 'wl-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss']
})
export class ExampleComponent {


  public filter1: string;
  public filter2: string;
  public filter3: string;
  public filter4: string;
  public filter5: string;

  person1: Person = {name: 'Anakin Skywalker', nationalId: 'Dart Vader'};
  person2: Person = {name: 'Conde Drácula', nationalId: 'Transilvânia'};
  person3: Person = {name: 'Kakaroto', nationalId: 'Sayajin'};
  person4: Person = {name: 'Bruce Lee', nationalId: 'Chinese'};

  groups: Group[] = [
    {
      id: 'GR1',
      name: 'Readers',
      tags: ['A', 'B', 'C']
    },
    {
      id: 'GR2',
      name: 'Writers',
      tags: ['D', 'E', 'F']
    },
    {
      id: 'GR3',
      name: 'Updaters',
      tags: ['A', 'G', 'H']
    },
    {
      id: 'GR4',
      name: 'Admins',
      tags: ['D', 'I', 'J']
    }
  ];

  public users: User[] = [
    {
      code: 'USR1',
      name: 'USER 1',
      groups: [],
      tags: ['GOLD', 'DIAMOND'],
      person: this.person1
    },
    {
      code: 'USR2',
      name: 'USER 2',
      groups: this.groups,
      tags: ['A1', 'A2', 'A3'],
      person: this.person2
    },
    {
      code: 'USR3',
      name: 'USER 3',
      groups: null,
      tags: ['A2', 'A4', 'A5'],
      person: this.person3
    },
    {
      code: 'USR4',
      name: 'USER 4',
      groups: this.groups,
      tags: ['A5', 'A6', 'A7'],
      person: this.person4
    },
    {
      code: 'USR5',
      name: 'USER 5',
      groups: [
        {
          id: 'GR99',
          name: 'Group 99',
          tags: ['F', 'T', 'A']
        },
        {
          id: 'GR98',
          name: 'Test Group',
          tags: ['P', 'Q', 'D']
        },
      ],
      tags: ['T1', 'Nómê com pável'],
      person: this.person1
    },
  ];

  constructor(private pipe: WfilterPipe) {
  }

  search(filter): User[] {
    return this.pipe.transform(this.users,
        [
          {field: 'code', value: filter},
          {field: 'name', value: filter},
          {field: 'tags', value: filter},
          {field: 'person.name', value: filter},
          {field: 'person.nationalId', value: filter},
          {field: 'groups', value: [
            {field: 'id', value: filter},
            {field: 'name', value: filter},
            {field: 'tags', value: filter},
          ]}
        ]);
  }

}
