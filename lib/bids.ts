import { NEXT_REWRITTEN_PATH_HEADER } from "next/dist/client/components/app-router-headers";
import { v4 as uuidv4 } from 'uuid';
import { faker } from '@faker-js/faker';

import { Collection, getCollections } from './collections'
import { User, getUsers } from './users'

export interface Bid {
    id: string;
    collection_id: string;
    user_id: string;
    price: number;
    status: string;
}

let bids: Record<string, Bid> = {};

export function getBids() {
    return Object.values(bids);
}

export function addBid(
    collection_id: string,
    user_id: string,
    price: number
) {
    const newId: string = uuidv4();
    const newBid: Bid = {
        id: newId,
        collection_id,
        user_id,
        price,
        status: 'pending',
    };
    bids[newId] = newBid;
    return newBid;
}

export function updateBid(id: string, bid: Bid) {
    if (id in bids) {
        const current: Bid = bids[id];
        bids[id] = { ...current, ...bid, id };
        return bids[id];
    }
    return null;
}

export function deleteBid(id: string) {
    if (!(id in bids)) {
        return false
    }
    delete bids[id];
    return true;
}

export function acceptBid(bid_id: string) {
    let accepted_bid = bids[bid_id];
    if (accepted_bid.collection_id !== collection_id) {
        return false;
    }
    for (const bid of getBids()) {
        if (bid.collection_id === collection_id) {
            bid.status = "rejected";
        }
    }
    accepted_bid.status = "accepted";
    return true;
}

function generateMockData() {
    const users = getUsers();
    const collections = getCollections();
    for (const collection of collections) {
        const count = faker.number.int({min: 10, max: 20});
        for (let i = 0; i < count; i++) {
            const user = faker.helpers.arrayElement(users);
            addBid(
                collection.id,
                user.id,
                faker.number.int({min: 1, max:100})
            )
        }
    }
}

generateMockData();
