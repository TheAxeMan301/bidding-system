import { NEXT_REWRITTEN_PATH_HEADER } from "next/dist/client/components/app-router-headers";
import { v4 as uuidv4 } from 'uuid';

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


