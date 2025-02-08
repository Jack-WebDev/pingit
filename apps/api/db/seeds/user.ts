import { faker } from '@pingit/testkit';
import { generateFakeSouthAfricanID, getDateOfBirthFromID, generateCUID } from '@pingit/utils';

import * as argon from 'argon2';
import { Knex } from 'knex';
import { startCase } from 'lodash';
import { Race, Title, UserRole, UserStatus } from '~/account';

const usersList = Array.from({ length: 200 }).map((_, index) => faker.internet.email());

const list = [
  'jack-admin@gmail.com',
  'jack-staff@gmail.com',
];

const users = usersList.concat(list);

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("user").del();

    const hasRan = Boolean(await knex('user').select('id').whereIn('email', users).first());

    if (hasRan) {
      return;
    }

    const user = async (email: string) => {
        const name = faker.person.firstName();
        const surname = faker.person.lastName();
        const middleName = faker.person.middleName();
        const password = await argon.hash(email);
        const title = faker.helpers.enumValue(Title);
        const race = faker.helpers.enumValue(Race);
        const month = faker.number.int({ min: 1, max: 12 });
        const day = faker.number.int({ min: 1, max: 28 });
        const idGender = faker.helpers.arrayElement(['male', 'female']) as 'male' | 'female';
        const idAge = faker.number.int({ min: 18, max: 65 });
        const idNumber = generateFakeSouthAfricanID(idAge, idGender, month, day);
        const birthDate = getDateOfBirthFromID(idNumber);
        const gender = startCase(idGender);
        const role = email.includes('admin')
          ? UserRole.Admin
          : email.includes('staff')
          ? UserRole.Staff
          : faker.helpers.enumValue(UserRole);
    
        return {
          id: generateCUID(),
          name,
          surname,
          email,
          gender,
          middleName,
          password,
          birthDate,
          idNumber,
          title,
          race,
          role,
          status: UserStatus.Active,
        };
      };
    
      const data = await Promise.all(users.map(async (email) => user(email)));
  

    // Inserts seed entries
    console.log({ users: data });

    await knex('user').insert(data).onConflict('email').ignore().onConflict('idNumber').ignore();
};
