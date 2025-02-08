import { BaseModel } from '@pingit/datakit';

import Objection from 'objection';
import { Context } from '~/context';

export enum Gender {
  Male = 'Male',
  Female = 'Female',
  NonBinary = 'NonBinary',
}

export enum Title {
  Mr = 'Mr',
  Ms = 'Ms',
  Mrs = 'Mrs',
  Miss = 'Miss',
  Dr = 'Dr',
  Prof = 'Prof',
  Other = 'Other',
}

export enum UserRole {
  Admin = 'Admin',
    Staff = 'Staff',
}

export enum Race {
  African = 'African',
  Coloured = 'Coloured',
  Indian = 'Indian',
  White = 'White',
  Other = 'Other',
}

export enum UserStatus {
  Active = 'Active',
  Inactive = 'Inactive',
}

type Name = {
  name: string;
  surname: string;
};

export class User extends BaseModel {
  static tableName = 'user';
  static typeIdentifier = 'User';

  id: string = '';
  sequence: number = 0;
  role: UserRole = UserRole.Admin;
  status: UserStatus = UserStatus.Active;
  email: string = '';
  title: Title | null = null;
  name: string = '';
  middleName: string | null = null;
  surname: string = '';
  gender: Gender | null = null;
  race: Race | null = null;
  birthDate: Date | null = null;
  idNumber: string = '';
  password?: string | null = null;

  // constructor(id: string, sequence: number, role: UserRole, status: UserStatus, email: string, title: Title | null, name: string, middleName: string | null, surname: string, gender: Gender | null, race: Race | null, birthDate: Date | null, idNumber: string, password?: string | null) {
  //   super();
  //   this.id = id;
  //   this.sequence = sequence;
  //   this.role = role;
  //   this.status = status;
  //   this.email = email;
  //   this.title = title;
  //   this.name = name;
  //   this.middleName = middleName;
  //   this.surname = surname;
  //   this.gender = gender;
  //   this.race = race;
  //   this.birthDate = birthDate;
  //   this.idNumber = idNumber;
  //   this.password = password;
  // }


  static getName({ name, surname }: Name) {
    return `${name} ${surname}`;
  }

  static getSortName(name: string, surname: string) {
    return User.getName({ name, surname }).toLowerCase().replace(/\s/g, '');
  }

  static applySearch(
    query: Objection.QueryBuilder<User, User[]>,
    db: Context['db'],
    text?: string | null,
  ) {
    if (text) {
      const rank = `ts_rank(search, websearch_to_tsquery('simple', ?))`;
      query
        .select(db.raw(`*, ${rank} as rank`, text))
        .whereRaw(`search @@ websearch_to_tsquery('simple', ?)`, text)
        .andWhereRaw(`${rank} > 0`, text)
        .orderBy('rank', 'desc');
    } else {
      query.select('*');
    }
  }

}
