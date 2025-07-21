import { NEXT_REWRITTEN_PATH_HEADER } from "next/dist/client/components/app-router-headers";
import { v4 as uuidv4 } from 'uuid';
import { faker } from '@faker-js/faker';

export interface Collection {
    id: string;
    name: string;
    description: string;
    stock: number;
    price: number;
}

let collections: Record<string, Collection> = {};

export function getCollections() {
    return Object.values(collections);
}

export function addCollection(
    name: string,
    description: string,
    stock: number,
    price: number,
) {
    const newId: string = uuidv4();
    const newCollection: Collection = {
        id: newId,
        name,
        description,
        stock,
        price,
    };
    collections[newId] = newCollection;
    return newCollection
}

export function updateCollection(id: string, collection: Collection) {
    if (id in collections) {
        const current: Collection = collections[id];
        collections[id] = { ...current, ...collection, id };
        return collections[id];
    }
    return null;
}

export function deleteCollection(id: string) {
    if (!(id in collections)) {
        return false
    }
    delete collections[id];
    return true;
}

function generateMockData() {
    const count = faker.number.int({min: 100, max: 110});
    for (let i = 0; i < count; i++) {
        addCollection(
            faker.commerce.product(),
            faker.lorem.sentence(),
            faker.number.int({min: 20, max: 200}),
            faker.number.int({min: 1, max:100})
        )
    }
}

generateMockData();
