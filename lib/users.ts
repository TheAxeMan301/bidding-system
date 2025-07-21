import { NEXT_REWRITTEN_PATH_HEADER } from "next/dist/client/components/app-router-headers";
import { v4 as uuidv4 } from 'uuid';
import { faker } from '@faker-js/faker';

export interface User {
    id: string;
    name: string;
    email: string;
}

let users: Record<string, User> = {};

export function getUsers() {
    return Object.values(users);
}

export function getUser(id: string) {
    if (id in users) {
        return users[id];
    }
    return null;
}

export function addUser(
    name: string,
    email: string,
) {
    const newId: string = uuidv4();
    const newUser: User = {
        id: newId,
        name,
        email,
    };
    users[newId] = newUser;
    return newUser
}

function generateMockData() {
    const count = faker.number.int({min: 10, max: 20});
    for (let i = 0; i < count; i++) {
        addUser(
            faker.person.firstName(),
            faker.internet.email()
        )
    }
}

generateMockData();
