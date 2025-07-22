import { useState } from 'react';

import { Collection } from "@/lib/collections";
import { Bid } from "@/lib/bids";
import { User } from "@/lib/users";

type CollectionDisplayProps = {
    collection: Collection,
    bids: Bid[],
    users: User[],
    currentUser: User,
    onDelete: (collection_id: string) => void;
    onCreateBid: (price: string, collection_id: string) => void;
    onAcceptBid: (bid_id: string) => void;
    onCancelBid: (bid_id: string) => void;
};

export default function CollectionDisplay({ collection, bids, users, currentUser, onDelete, onCreateBid, onAcceptBid, onCancelBid }: CollectionDisplayProps) {
    const [bidPrice, setBidPrice] = useState("0");

    const getUserName = (user_id: string) =>  {
        const user = users.find(user => user.id === user_id);
        if (!user) {
        return "Unknown user";
        }
        return user.name;
    }

    return (
    <div className="border rounded-lg p-4 shadow-md hover:shadow-lg transition duration-200 space-y-2">
        <h2 className="text-xl font-semibold">{collection.name}</h2>
        <p className="text-sm text-gray-500">Owner: {getUserName(collection.owner_id)}</p>

        <div className="flex justify-between text-sm text-gray-700">
            <span>Stock: {collection.stock}</span>
            <span>Price: ${collection.price}</span>
        </div>

        <p className="text-gray-800">{collection.description}</p>

        {currentUser.id === collection.owner_id && (
            <button
                onClick={() => onDelete(collection.id)}
                className="mt-2 text-red-600 hover:text-red-800 text-sm font-medium"
            >
                Delete
            </button>
        )}

        <form onSubmit={() => onCreateBid(bidPrice, collection.id)} className="flex items-center space-x-2">
            <label className="flex items-center space-x-1">
                <span className="text-sm text-gray-700">Bid Price ($)</span>
                <input
                type="number"
                value={bidPrice}
                onChange={(e) => setBidPrice(e.target.value)}
                className="w-24 px-2 py-1 border rounded text-sm"
                />
            </label>
            <button
                type="submit"
                className="bg-blue-600 text-white px-3 py-1 text-sm rounded hover:bg-blue-700"
            >
                Submit Bid
            </button>
        </form>

        <ul className="list-none p-0 space-y-2">
        {bids.filter((bid) => bid.collection_id === collection.id).map((bid) => (
            <li
            key={bid.id}
            className="flex justify-between items-center p-2 border rounded shadow-sm bg-white"
            >
            <div className="text-sm font-medium text-gray-800">{getUserName(bid.user_id)}</div>
            <div className="text-sm text-gray-600">${bid.price}</div>
            <div
                className={`text-xs font-semibold px-2 py-1 rounded ${
                bid.status === 'accepted'
                    ? 'bg-green-100 text-green-800'
                    : bid.status === 'pending'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-red-100 text-red-800'
                }`}
            >
                {bid.status}
            </div>
            {currentUser.id === collection.owner_id && bid.status === 'pending' && (
                <button
                    onClick={() => onAcceptBid(bid.id)}
                    className="mt-2 text-green-600 hover:text-red-800 text-sm font-medium"
                >
                    Accept
                </button>
            )}
            {currentUser.id === bid.user_id && bid.status === 'pending' && (
                <button
                    onClick={() => onCancelBid(bid.id)}
                    className="mt-2 text-red-600 hover:text-red-800 text-sm font-medium"
                >
                    Cancel
                </button>
            )}
            </li>
        ))}
        </ul>
    </div>
    );

}
