'use client';

import React, { useEffect, useState } from 'react';

import { Collection } from "@/lib/collections";

export default function Home() {
  const [collections, setCollections] = useState<Collection[]>([]);
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
    setLoading(false);
  };

  useEffect(() => {
    fetchCollections();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/collections', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    if (res.ok) {
      setFormData({ name: '', description: '', stock: '', price: ''});
      fetchCollections();
    }
  };

  const handleDelete = async (id: string) => {
    await fetch(`/api/collections?id=${id}`, { method: 'DELETE' });
    fetchCollections();
  };

  return (
    <div className="font-sans">
      <main className="p-4">
        <h1 className="text-2x1 font-bold mb-4">New Collection</h1>
        <form onSubmit={handleCreate} className="mb-4 flex gap-2">
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
        <ul className="font-mono list-inside list-decimal text-sm/6 text-center sm:text-left">
          {collections.map((collection) => (
            <li key={collection.id} className="mb-2 tracking-[-.01em]">
              {collection.id} -- {collection.name}
            </li>
          ))}
        </ul>
        </main>
    </div>
  );
}
