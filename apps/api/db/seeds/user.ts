import { Race, Title, UserStatus } from '~/account';

import { faker } from '@pingit/testkit';
import {
    generateCUID,
    generateFakeSouthAfricanID,
    getDateOfBirthFromID,
} from '@pingit/utils';
import * as argon from 'argon2';
import { Knex } from 'knex';
import { startCase } from 'lodash';

const usersList = Array.from({ length: 100 }).map((_, index) =>
    faker.internet.email()
);

const list = ['jackwebdev@gmail.com', 'jackbuda@gmail.com'];

const users = usersList.concat(list);

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex('user').del();

    const hasRan = Boolean(
        await knex('user').select('id').whereIn('email', users).first()
    );

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
        const idGender = faker.helpers.arrayElement(['male', 'female']) as
            | 'male'
            | 'female';
        const idAge = faker.number.int({ min: 18, max: 65 });
        const idNumber = generateFakeSouthAfricanID(
            idAge,
            idGender,
            month,
            day
        );
        const birthDate = getDateOfBirthFromID(idNumber);
        const gender = startCase(idGender);

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
            status: UserStatus.Active,
        };
    };

    const data = await Promise.all(users.map(async (email) => user(email)));

    // Inserts seed entries
    console.log({ users: data });

    await knex('user')
        .insert(data)
        .onConflict('email')
        .ignore()
        .onConflict('idNumber')
        .ignore();
}
