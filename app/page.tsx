'use client';

import React, { useEffect, useState } from 'react';

import { Collection } from "@/lib/collections";
import { Bid } from "@/lib/bids";
import { User } from "@/lib/users";

import CollectionDisplay from './components/collection-display';

export default function Home() {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [bids, setBids] = useState<Bid[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User>({
    id: '',
    name: "Unknown User",
    email: '',
  });
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    stock: "",
    price: "",
  });

  const fetchCollections = async () => {
    const res = await fetch('/api/collections');
    if (res.ok) {
      const data = await res.json();
      setCollections(data);
    }
  };
  const fetchBids = async () => {
    const res = await fetch('/api/bids');
    if (res.ok) {
      const data = await res.json();
      setBids(data);
    }
  };
  const fetchUsers = async () => {
    const res = await fetch('/api/users');
    if (res.ok) {
      const data = await res.json();
      setUsers(data);
    }
  };

  const fetchData = async () => {
    const [userRes, collectionRes, bidRes] = await Promise.all([
      fetch('/api/users').then(res => res.json()),
      fetch('/api/collections').then(res => res.json()),
      fetch('/api/bids').then(res => res.json()),
    ]);
    setUsers(userRes);
    if (currentUser.id === '') {
      setCurrentUser(userRes[0]);
    }
    setCollections(collectionRes);
    setBids(bidRes);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreateCollection = async (e: React.FormEvent) => {
    e.preventDefault();
    const owner_id = currentUser?.id;
    const res = await fetch('/api/collections', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({...formData, owner_id}),
    });
    if (res.ok) {
      setFormData({ name: '', description: '', stock: '', price: ''});
      fetchData();
    }
  };

  const handleDelete = async (id: string) => {
    await fetch(`/api/collections/${id}`, { method: 'DELETE' });
    fetchData();
  };

  const handleCreateBid = async (price: string, collection_id: string) => {
    const user_id = currentUser?.id;
    const res = await fetch('/api/bids', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        price,
        collection_id,
        user_id,
      }),
    });
    if (res.ok) {
      fetchData();
    }
  };

  const handleAcceptBid = async (bid_id: string) => {
    const res = await fetch(`/api/bids/${bid_id}/accept`)
    if (res.ok) {
      fetchData();
    }
  };

  const handleCancelBid = async (bid_id: string) => {
    await fetch(`/api/bids/${bid_id}`, { method: 'DELETE' });
    fetchData();
  };

  const onUserSelection = (userId: string) => {
    const user = users.find(user => user.id === userId);
    if (user) {
      setCurrentUser(user);
    }
  }


  return (
    <div className="font-sans">
      <main className="p-4">
        <label htmlFor="user-select" className="block font-bold font-medium mb-1">
          Current User:
        </label>
        <select
          id="user-select"
          onChange={(e) => onUserSelection(e.target.value)}
          className="border px-3 py-2 rounded w-full"
        >
          <option value="" disabled>
            -- Choose a user --
          </option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name} ({user.email})
            </option>
          ))}
        </select>
        <p>&nbsp;</p>

        <h1 className="text-2x1 font-bold mb-4">New Collection</h1>
        <form onSubmit={handleCreateCollection} className="mb-4 flex gap-2">
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            className="w-full border p-2 rounded"
            required
          />
          <input
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full border p-2 rounded"
          />
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            placeholder="Stock"
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price"
            className="w-full border p-2 rounded"
            required
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Add Collection
          </button>
        </form>

        <h1 className="text-2xl fond-bold mb-4">Collection List</h1>
        <ul className="font-mono list-inside list-none text-sm/6 text-center sm:text-left">
          {collections.map((collection) => (
            <li key={collection.id} className="mb-2 tracking-[-.01em]">
              <CollectionDisplay
                collection={collection} 
                bids={bids}
                users={users}
                currentUser={currentUser}
                onDelete={handleDelete}
                onCreateBid={handleCreateBid}
                onAcceptBid={handleAcceptBid}
                onCancelBid={handleCancelBid}
              ></CollectionDisplay>
            </li>
          ))}
        </ul>
        </main>
    </div>
  );
}
